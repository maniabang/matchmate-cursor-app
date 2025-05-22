import React, { useRef } from "react";

interface ProfileImageUploaderProps {
  images: (string | null)[];
  setImages: React.Dispatch<React.SetStateAction<(string | null)[]>>;
}

export default function ProfileImageUploader({ images, setImages }: ProfileImageUploaderProps) {
  const fileInputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleFileChange = (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages(prev => {
          const copy = [...prev];
          copy[idx] = ev.target?.result as string;
          return copy;
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelete = (idx: number) => {
    setImages(prev => {
      const copy = [...prev];
      copy[idx] = null;
      return copy;
    });
  };

  return (
    <>
      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', justifyContent: 'center', marginBottom: 8 }}>
        {images.map((img, idx) => (
          <div key={idx} style={{ position: 'relative' }}>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRefs[idx]}
              style={{ display: 'none' }}
              onChange={e => handleFileChange(idx, e)}
            />
            <div
              onClick={() => fileInputRefs[idx].current?.click()}
              style={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                background: '#FFF6F5',
                border: '2px dashed #EBA8A6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                overflow: 'hidden',
                position: 'relative',
              }}
            >
              {img ? (
                <img src={img} alt={`프로필${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#EBA8A6', fontSize: 24 }}>+</span>
              )}
            </div>
            {img && (
              <button
                type="button"
                onClick={e => { e.stopPropagation(); handleDelete(idx); }}
                style={{
                  position: 'absolute',
                  top: -8,
                  right: -8,
                  background: '#fff',
                  border: '1.5px solid #EBA8A6',
                  borderRadius: '50%',
                  width: 22,
                  height: 22,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#EBA8A6',
                  fontWeight: 700,
                  fontSize: 14,
                  cursor: 'pointer',
                  zIndex: 2,
                }}
                aria-label="삭제"
              >
                ×
              </button>
            )}
          </div>
        ))}
      </div>
      {/* 가이드 문구 */}
      <div style={{ color: '#888', fontSize: '0.95rem', marginBottom: 8, textAlign: 'center' }}>
        최대 6장까지 등록할 수 있어요.<br />첫 번째 사진이 대표로 사용됩니다.<br />
        이목구비가 잘 나오는 화사한 사진을 추천드려요!
      </div>
    </>
  );
} 