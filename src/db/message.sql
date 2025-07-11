-- Supabase messages 테이블 생성 쿼리
create table messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid not null references profiles(id) on delete cascade,
  receiver_id uuid not null references profiles(id) on delete cascade,
  content text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- created_at 인덱스 (최신순 정렬 빠르게)
create index messages_created_at_idx on messages(created_at desc);

-- sender_id, receiver_id 복합 인덱스 (대화방 쿼리 최적화)
create index messages_sender_receiver_idx on messages(sender_id, receiver_id);

-- RPC 함수 쿼리
create or replace function get_last_messages_by_conversation(user_id uuid)
returns table (
  id uuid,
  sender_id uuid,
  receiver_id uuid,
  content text,
  created_at timestamptz,
  is_read boolean
) as $$
  select distinct on (
      case
        when sender_id = user_id then receiver_id
        else sender_id
      end
    ) *
  from messages
  where sender_id = user_id or receiver_id = user_id
  order by
    case
      when sender_id = user_id then receiver_id
      else sender_id
    end,
    created_at desc;
$$ language sql;

-- 미읽은 메시지 개수를 파트너별로 반환하는 RPC 함수
create or replace function get_unread_counts_by_partner(user_id uuid)
returns table (
  partner_id uuid,
  unread_count bigint
) as $$
  select 
    sender_id as partner_id,
    count(*) as unread_count
  from messages 
  where receiver_id = user_id 
    and is_read = false
  group by sender_id;
$$ language sql;

-- 매시지 보내기 시 강제로 메시지 보낼 수 있도록 매칭
create or replace function force_match_and_send_message(
  p_sender_id uuid,
  p_receiver_id uuid,
  p_content text
) returns json as $$
declare
  like1 likes%rowtype;
  like2 likes%rowtype;
begin
  -- 1. likes row가 없으면 생성
  select * into like1 from likes where sender_id = p_sender_id and receiver_id = p_receiver_id;
  if like1.id is null then
    insert into likes (sender_id, receiver_id, is_accepted, accepted_at)
    values (p_sender_id, p_receiver_id, true, now());
  else
    update likes set is_accepted = true, accepted_at = now()
    where id = like1.id;
  end if;

  select * into like2 from likes where sender_id = p_receiver_id and receiver_id = p_sender_id;
  if like2.id is null then
    insert into likes (sender_id, receiver_id, is_accepted, accepted_at)
    values (p_receiver_id, p_sender_id, true, now());
  else
    update likes set is_accepted = true, accepted_at = now()
    where id = like2.id;
  end if;

  -- 2. 메시지 저장
  insert into messages (sender_id, receiver_id, content)
  values (p_sender_id, p_receiver_id, p_content);

  return json_build_object('success', true, 'matched', true, 'message', '메시지 전송 및 매칭 완료');
end;
$$ language plpgsql;
