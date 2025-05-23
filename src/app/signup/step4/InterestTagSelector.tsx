import React from "react";

const TAGS = [
  "운동", "여행", "음악감상", "영화", "독서", "맛집탐방", "요리", "반려동물", "게임", "사진", "드라이브", "쇼핑", "자연", "예술", "자기계발", "카페"
];

type Props = {
  selected: string[];
  setSelected: (tags: string[]) => void;
  max: number;
};

export default function InterestTagSelector({ selected, setSelected, max }: Props) {
  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag));
    } else if (selected.length < max) {
      setSelected([...selected, tag]);
    }
  };

  return (
    <div>
      <div style={{ color: '#222', fontSize: '1.1rem', fontWeight: 600, marginBottom: 8 }}>
        관심사 태그를 선택해 주세요
      </div>
      <div style={{ color: '#888', fontSize: '0.98rem', marginBottom: 8 }}>
        최대 {max}개까지 선택할 수 있어요
      </div>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        marginBottom: 8,
      }}>
        {TAGS.map(tag => (
          <button
            type="button"
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{
              padding: '6px 12px',
              borderRadius: 20,
              border: selected.includes(tag) ? '2px solid #EBA8A6' : '1.5px solid #EBA8A6',
              background: selected.includes(tag) ? '#EBA8A6' : '#fff',
              color: selected.includes(tag) ? '#fff' : '#EBA8A6',
              fontWeight: 600,
              fontSize: '1rem',
              cursor: 'pointer',
              transition: 'all 0.15s',
              outline: 'none',
            }}
            disabled={!selected.includes(tag) && selected.length >= max}
          >
            {tag}
          </button>
        ))}
      </div>
      <div style={{ color: selected.length === max ? '#EBA8A6' : '#aaa', fontSize: '0.97rem', marginBottom: 4, textAlign: 'right' }}>
        {selected.length} / {max} 선택됨
      </div>
    </div>
  );
} 