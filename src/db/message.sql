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
