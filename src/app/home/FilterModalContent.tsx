import React, { useState } from 'react';

export default function FilterModalContent({
  initial,
  onChange,
}: {
  initial: { distance: number; age: [number, number]; location: string; gender: string };
  onChange: (v: any) => void;
}) {
  const [distance, setDistance] = useState(initial.distance ?? 20);
  const [age, setAge] = useState(initial.age ?? [20, 30]);
  const [location, setLocation] = useState(initial.location ?? '');
  const [gender, setGender] = useState(initial.gender ?? '');

  // UI는 사진 참고해서 슬라이더, 셀렉트 등으로 구현
  return (
    <div>
      <div>
        <label>최대 거리: {distance}km</label>
        <input type="range" min={1} max={100} value={distance} onChange={(e) => setDistance(Number(e.target.value))} />
      </div>
      <div>
        <label>
          나이: {age[0]} ~ {age[1]}
        </label>
        <input
          type="range"
          min={18}
          max={99}
          value={age[0]}
          onChange={(e) => setAge([Number(e.target.value), age[1]])}
        />
        <input
          type="range"
          min={18}
          max={99}
          value={age[1]}
          onChange={(e) => setAge([age[0], Number(e.target.value)])}
        />
      </div>
      <div>
        <label>위치</label>
        <select value={location} onChange={(e) => setLocation(e.target.value)}>
          <option value="">선택</option>
          <option value="서울">서울</option>
          <option value="경기">경기</option>
          {/* ... */}
        </select>
      </div>
      <div>
        <label>성별</label>
        <select value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">상관없음</option>
          <option value="female">여성</option>
          <option value="male">남성</option>
        </select>
      </div>
      {/* 필요시 onChange로 값 전달 */}
    </div>
  );
}
