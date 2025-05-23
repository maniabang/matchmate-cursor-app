import { create } from 'zustand';
import { ProfileStep1, ProfileStep2, ProfileStep3, ProfileStep4, Profile } from '@/api/types';

interface SignupState {
  step1: ProfileStep1;
  step2: ProfileStep2;
  step3: ProfileStep3;
  step4: ProfileStep4;
  intro: string;
  // API 리스폰스 및 상태
  profile: Profile | null;
  loading: boolean;
  error: string | null;
  userId: string | null;
  // setter
  setStep1: (data: ProfileStep1) => void;
  setStep2: (data: ProfileStep2) => void;
  setStep3: (data: ProfileStep3) => void;
  setStep4: (data: ProfileStep4) => void;
  setIntro: (intro: string) => void;
  setProfile: (profile: Profile | null) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
  getProfileData: (userId: string) => Profile;
  setUserId: (id: string) => void;
}

const initialState = {
  step1: { nickname: '' },
  step2: { photo_urls: [] },
  step3: { birth: '', gender: '', job: '', region: '', mbti: '' },
  step4: { interests: [], ideals: [] },
  intro: '',
  profile: null,
  loading: false,
  error: null,
  userId: null,
};

export const useSignupStore = create<SignupState>((set, get) => ({
  ...initialState,
  setStep1: (data) => set({ step1: data }),
  setStep2: (data) => set({ step2: data }),
  setStep3: (data) => set({ step3: data }),
  setStep4: (data) => set({ step4: data }),
  setIntro: (intro) => set({ intro }),
  setProfile: (profile) => set({ profile }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  reset: () => set(initialState),
  getProfileData: (userId: string) => {
    const { step1, step2, step3, step4, intro } = get();
    return {
      ...step1,
      ...step2,
      ...step3,
      ...step4,
      intro,
      id: userId, // 실제 유저 id를 할당
    };
  },
  setUserId: (id) => set({ userId: id }),
})); 