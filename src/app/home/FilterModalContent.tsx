import React, { useState, useEffect } from 'react';

export interface FilterOptions {
  minAge: number;
  maxAge: number;
  region: string;
  gender: string;
}

interface FilterModalContentProps {
  initial: FilterOptions;
  onChange: (filters: FilterOptions) => void;
  onApply: (filters: FilterOptions) => void;
}

export default function FilterModalContent({ initial, onChange, onApply }: FilterModalContentProps) {
  const [minAge, setMinAge] = useState(initial.minAge ?? 20);
  const [maxAge, setMaxAge] = useState(initial.maxAge ?? 30);
  const [region, setRegion] = useState(initial.region ?? '');
  const [gender, setGender] = useState(initial.gender ?? 'female');

  // 필터 값이 변경될 때마다 부모에게 알림
  useEffect(() => {
    onChange({
      minAge,
      maxAge,
      region,
      gender,
    });
  }, [minAge, maxAge, region, gender, onChange]);

  const handleApply = () => {
    const currentFilters = {
      minAge,
      maxAge,
      region,
      gender,
    };
    onApply(currentFilters);
  };

  return (
    <div style={{ padding: '20px' }}>
      {/* 나이 범위 선택 */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '12px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          나이: {minAge}세 ~ {maxAge}세
        </label>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', color: '#666' }}>최소</label>
            <input
              type="range"
              min={18}
              max={60}
              value={minAge}
              onChange={(e) => {
                const newMin = Number(e.target.value);
                setMinAge(newMin);
                if (newMin > maxAge) {
                  setMaxAge(newMin);
                }
              }}
              style={{
                width: '100%',
                height: '6px',
                background: '#ddd',
                borderRadius: '3px',
                outline: 'none',
                appearance: 'none',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ fontSize: '14px', color: '#666' }}>최대</label>
            <input
              type="range"
              min={18}
              max={60}
              value={maxAge}
              onChange={(e) => {
                const newMax = Number(e.target.value);
                setMaxAge(newMax);
                if (newMax < minAge) {
                  setMinAge(newMax);
                }
              }}
              style={{
                width: '100%',
                height: '6px',
                background: '#ddd',
                borderRadius: '3px',
                outline: 'none',
                appearance: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* 지역 선택 */}
      <div style={{ marginBottom: '24px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          지역
        </label>
        <select
          value={region}
          onChange={(e) => setRegion(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: '#fff',
            outline: 'none',
          }}
        >
          <option value="">전체 지역</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          <option value="인천">인천</option>
          <option value="부산">부산</option>
          <option value="대구">대구</option>
          <option value="대전">대전</option>
          <option value="광주">광주</option>
          <option value="울산">울산</option>
          <option value="세종">세종</option>
          <option value="강원">강원</option>
          <option value="충북">충북</option>
          <option value="충남">충남</option>
          <option value="전북">전북</option>
          <option value="전남">전남</option>
          <option value="경북">경북</option>
          <option value="경남">경남</option>
          <option value="제주">제주</option>
        </select>
      </div>

      {/* 성별 선택 */}
      <div style={{ marginBottom: '32px' }}>
        <label
          style={{
            display: 'block',
            marginBottom: '8px',
            fontSize: '16px',
            fontWeight: '600',
            color: '#333',
          }}
        >
          관심 성별
        </label>
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{
            width: '100%',
            padding: '12px',
            border: '1px solid #ddd',
            borderRadius: '8px',
            fontSize: '16px',
            backgroundColor: '#fff',
            outline: 'none',
          }}
        >
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
      </div>

      {/* 적용 버튼 */}
      <button
        onClick={handleApply}
        style={{
          width: '100%',
          padding: '14px',
          backgroundColor: '#ff69b4',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '16px',
          fontWeight: '600',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = '#ff1493';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = '#ff69b4';
        }}
      >
        필터 적용
      </button>
    </div>
  );
}
