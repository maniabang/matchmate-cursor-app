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