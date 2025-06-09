import React from "react";

const MBTI_TYPES = [
  '', 'ISTJ', 'ISFJ', 'INFJ', 'INTJ',
  'ISTP', 'ISFP', 'INFP', 'INTP',
  'ESTP', 'ESFP', 'ENFP', 'ENTP',
  'ESTJ', 'ESFJ', 'ENFJ', 'ENTJ',
];

const REGIONS = [
  '', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'
];

interface BasicInfoFormProps {
  birth: string;
  setBirth: (v: string) => void;
  gender: string;
  setGender: (v: string) => void;
  job: string;
  setJob: (v: string) => void;
  region: string;
  setRegion: (v: string) => void;
  mbti: string;
  setMbti: (v: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isEdit?: boolean;
}

export default function BasicInfoForm({ birth, setBirth, gender, setGender, job, setJob, region, setRegion, mbti, setMbti, onSubmit, isEdit = false }: BasicInfoFormProps) {
  return (
    <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 18,
      width: 320,
      background: '#fff',
      borderRadius: 20,
      boxShadow: '0 4px 24px rgba(235,168,166,0.10)',
      padding: '40px 28px',
      marginTop: isEdit ? 0 : 80,
    }} onSubmit={onSubmit}>
      {/* 안내문구 */}
      <div style={{
        color: '#222',
        fontSize: '1.1rem',
        marginBottom: 8,
        fontWeight: 600,
      }}>
        기본 정보를 입력해 주세요
      </div>
      <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: 8 }}>
        선택 입력, 나중에 프로필에서 수정할 수 있어요
      </div>
      {/* 생년월일 */}
      <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>생년월일</label>
      <input
        type="date"
        value={birth}
        onChange={e => setBirth(e.target.value)}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 4,
        }}
      />
      {/* 성별 */}
      <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>성별</label>
      <select
        value={gender}
        onChange={e => setGender(e.target.value)}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 4,
          color: gender ? '#222' : '#aaa',
        }}
      >
        <option value="">선택 안 함</option>
        <option value="male">남성</option>
        <option value="female">여성</option>
        <option value="other">기타</option>
      </select>
      {/* 직업 */}
      <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>직업</label>
      <input
        type="text"
        placeholder="직업 (선택)"
        value={job}
        onChange={e => setJob(e.target.value)}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 4,
        }}
      />
      {/* 지역 */}
      <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>지역</label>
      <select
        value={region}
        onChange={e => setRegion(e.target.value)}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 4,
          color: region ? '#222' : '#aaa',
        }}
      >
        <option value="">선택 안 함</option>
        {REGIONS.slice(1).map(r => (
          <option key={r} value={r}>{r}</option>
        ))}
      </select>
      {/* MBTI */}
      <label style={{ color: '#EBA8A6', fontWeight: 600, fontSize: '1rem', marginBottom: 2 }}>MBTI</label>
      <select
        value={mbti}
        onChange={e => setMbti(e.target.value)}
        style={{
          padding: '10px 16px',
          borderRadius: 12,
          border: '1.5px solid #EBA8A6',
          fontSize: '1rem',
          outline: 'none',
          marginBottom: 4,
          color: mbti ? '#222' : '#aaa',
        }}
      >
        <option value="">선택 안 함</option>
        {MBTI_TYPES.slice(1).map(type => (
          <option key={type} value={type}>{type}</option>
        ))}
      </select>
      <button
        type="submit"
        style={{
          width: '100%',
          padding: '12px 0',
          borderRadius: 16,
          background: '#EBA8A6',
          color: '#fff',
          fontWeight: 700,
          fontSize: '1.05rem',
          border: 'none',
          boxShadow: '0 2px 8px rgba(22, 12, 12, 0.10)',
          cursor: 'pointer',
          letterSpacing: '-1px',
          marginTop: 8,
          transition: 'background 0.2s',
        }}
      >
        다음
      </button>
    </form>
  );
} 