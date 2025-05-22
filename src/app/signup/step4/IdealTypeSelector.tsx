import React from "react";

const IDEAL_TAGS = [
  "유머러스함", "성실함", "지적임", "다정함", "열정적임", "자신감", "배려심", "취미공유", "외모", "경제력", "자유로움", "감성적임", "리더십", "책임감", "긍정적임", "소통능력"
];

type Props = {
  selected: string[];
  setSelected: (tags: string[]) => void;
  max: number;
};

export default function IdealTypeSelector({ selected, setSelected, max }: Props) {
  const toggleTag = (tag: string) => {
    if (selected.includes(tag)) {
      setSelected(selected.filter(t => t !== tag));
    } else if (selected.length < max) {
      setSelected([...selected, tag]);
    }
  };

  return (
    <div>
      <div style={{ color: '#222', fontSize: '1.1rem', fontWeight: 600, margin: '18px 0 8px 0' }}>
        이상형 태그를 선택해 주세요
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
        {IDEAL_TAGS.map(tag => (
          <button
            type="button"
            key={tag}
            onClick={() => toggleTag(tag)}
            style={{
              padding: '8px 18px',
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