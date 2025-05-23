export interface ProfileStep1 {
  nickname: string;
}
export interface ProfileStep2 {
  photo_urls: string[]; // 최대 6장
}
export interface ProfileStep3 {
  birth: string; // YYYY-MM-DD
  gender: string;
  job: string;
  region: string;
  mbti: string;
}
export interface ProfileStep4 {
  interests: string[];
  ideals: string[];
}
export interface ProfileStep5 {
  intro: string;
}

export interface Profile
  extends ProfileStep1,
  ProfileStep2,
  ProfileStep3,
  ProfileStep4,
  ProfileStep5 {
  id: string; // Supabase user id
  created_at?: string;
} 