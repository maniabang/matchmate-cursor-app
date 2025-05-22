"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import BasicInfoForm from "./BasicInfoForm";

export default function SignupStep3() {
  const router = useRouter();
  const [birth, setBirth] = useState("");
  const [gender, setGender] = useState("");
  const [job, setJob] = useState("");
  const [region, setRegion] = useState("");

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
        style={{
          position: 'absolute',
          top: 24,
          left: 20,
          background: 'none',
          border: 'none',
          fontSize: '1.5rem',
          color: '#EBA8A6',
          cursor: 'pointer',
          zIndex: 10,
          padding: 0,
        }}
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
        onSubmit={e => { e.preventDefault(); router.push('/signup/step4'); }}
      />
    </div>
  );
} 