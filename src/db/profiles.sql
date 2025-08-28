-- Supabase profiles 테이블 생성 쿼리
create table profiles (
  id uuid primary key references auth.users(id),
  nickname text not null,
  photo_urls text[] default '{}',
  birth date,
  gender text,
  job text,
  region text,
  mbti text,
  interests text[] default '{}',
  ideals text[] default '{}',
  intro text,
  created_at timestamptz default now()
);

-- 나이와 지역으로 프로필을 필터링하는 RPC 함수 (상호작용 로직 개선)
CREATE OR REPLACE FUNCTION get_filtered_profiles(
  user_id uuid,
  target_gender text DEFAULT 'female',
  min_age integer DEFAULT 18,
  max_age integer DEFAULT 99,
  target_region text DEFAULT null
)
RETURNS TABLE (
  id uuid,
  nickname text,
  photo_urls text[],
  birth date,
  gender text,
  job text,
  region text,
  mbti text,
  interests text[],
  ideals text[],
  intro text,
  created_at timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM profiles p
  WHERE p.id != user_id  -- 자신 제외
    AND p.gender = target_gender  -- 성별 필터
    AND (
      -- 나이 필터링
      CASE 
        WHEN p.birth IS NOT NULL THEN
          EXTRACT(YEAR FROM AGE(CURRENT_DATE, p.birth)) BETWEEN min_age AND max_age
        ELSE false
      END
    )
    AND (target_region IS NULL OR p.region = target_region)  -- 지역 필터
    AND p.id NOT IN (
      -- 이미 상호작용한 사용자 제외 (좋아요 보냄/받음, 매칭됨)
      SELECT DISTINCT 
        CASE 
          WHEN l.sender_id = user_id THEN l.receiver_id
          WHEN l.receiver_id = user_id THEN l.sender_id
        END
      FROM likes l 
      WHERE l.sender_id = user_id OR l.receiver_id = user_id
    )
  ORDER BY p.created_at DESC;  -- 최신 가입자 우선
END;
$$;

-- 사용자의 나이를 계산하는 helper 함수
CREATE OR REPLACE FUNCTION calculate_age(birth_date date)
RETURNS integer
LANGUAGE plpgsql
AS $$
BEGIN
  IF birth_date IS NULL THEN
    RETURN NULL;
  END IF;
  
  RETURN EXTRACT(YEAR FROM AGE(CURRENT_DATE, birth_date));
END;
$$;

-- 상호작용하지 않은 프로필만 가져오는 단순 버전 (백업용)
CREATE OR REPLACE FUNCTION get_uninteracted_profiles(
  user_id uuid,
  target_gender text DEFAULT 'female'
)
RETURNS TABLE (
  id uuid,
  nickname text,
  photo_urls text[],
  birth date,
  gender text,
  job text,
  region text,
  mbti text,
  interests text[],
  ideals text[],
  intro text,
  created_at timestamptz
)
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN QUERY
  SELECT p.*
  FROM profiles p
  WHERE p.id != user_id  -- 자신 제외
    AND p.gender = target_gender  -- 성별 필터
    AND NOT EXISTS (
      -- 상호작용하지 않은 사용자만
      SELECT 1 FROM likes l 
      WHERE (l.sender_id = user_id AND l.receiver_id = p.id)
         OR (l.receiver_id = user_id AND l.sender_id = p.id)
    )
  ORDER BY p.created_at DESC;
END;
$$; 