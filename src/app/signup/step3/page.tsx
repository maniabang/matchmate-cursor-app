"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";
import { useSignupStore } from '@/store/useSignupStore';
import { profileBackButtonStyle } from '@/app/components/styles/ProfileButton.styles';

export default function SignupStep3() {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [region, setRegion] = useState("");
  const [mbti, setMbti] = useState("");
  const setStep3 = useSignupStore(state => state.setStep3);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep3({ birth, gender, job, region, mbti });
    router.push('/signup/step4');
  };

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#FFF6F5',
      position: 'relative',
    }}>
      {/* 뒤로가기 버튼 */}
      <button
        onClick={() => router.back()}
        style={profileBackButtonStyle}
        aria-label="뒤로가기"
      >
        ←
      </button>
      {/* 진행바 */}
      <div style={{
        position: 'absolute',
        top: 32,
        left: '50%',
        transform: 'translateX(-50%)',
        fontSize: '1rem',
        color: '#EBA8A6',
        fontWeight: 600,
        letterSpacing: '-1px',
      }}>
        3 / 5
      </div>
      <BasicInfoForm
        birth={birth}
        setBirth={setBirth}
        gender={gender}
        setGender={setGender}
        job={job}
        setJob={setJob}
        region={region}
        setRegion={setRegion}
        mbti={mbti}
        setMbti={setMbti}
        onSubmit={handleSubmit}
      />
    </div>
  );
} 