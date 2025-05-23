import React, { useRef } from "react";
import { uploadProfileImage, removeProfileImage } from '@/api/upload';

interface ProfileImageUploaderProps {
  images: { url: string | null, path: string | null }[];
  setImages: React.Dispatch<React.SetStateAction<{ url: string | null, path: string | null }[]>>;
  userId: string;
}

export default function ProfileImageUploader({ images, setImages, userId }: ProfileImageUploaderProps) {
  const fileInputRefs = Array.from({ length: 6 }, () => useRef<HTMLInputElement>(null));

  const handleFileChange = async (idx: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 기존 이미지가 있으면 Storage에서 삭제
    if (images[idx]?.path) {
      await removeProfileImage(images[idx].path!);
    }

    // 새 이미지 업로드
    const uploaded = await uploadProfileImage(file, userId);
    if (uploaded) {
      setImages(prev => {
        const copy = [...prev];
        copy[idx] = { url: uploaded.url, path: uploaded.path };
        return copy;
      });
    }
  };

  const handleDelete = async (idx: number) => {
    if (images[idx]?.path) {
      await removeProfileImage(images[idx].path!);
    }
    setImages(prev => {
      const copy = [...prev];
      copy[idx] = { url: null, path: null };
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
              {img.url ? (
                <img src={img.url} alt={`프로필${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <span style={{ color: '#EBA8A6', fontSize: 24 }}>+</span>
              )}
            </div>
            {img.url && (
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