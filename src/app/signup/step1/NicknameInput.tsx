import React, { useState } from "react";

interface NicknameInputProps {
  nickname: string;
  setNickname: (v: string) => void;
}

export default function NicknameInput({ nickname, setNickname }: NicknameInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const isValid = nickname.length >= 2 && nickname.length <= 10;
  const isError = nickname.length > 0 && !isValid;

  return (
    <div style={{ width: '100%' }}>
      {/* 타이틀 */}
      <div style={{
        fontWeight: 700,
        fontSize: '1.18rem',
        color: '#222',
        marginBottom: 6,
        letterSpacing: '-1px',
      }}>
        닉네임을 입력해 주세요
      </div>
      {/* 서브 안내문구 */}
      <div style={{
        color: '#888',
        fontSize: '0.98rem',
        marginBottom: 18,
      }}>
        닉네임은 공개 프로필에 표시돼요
      </div>
      {/* 인풋 + 글자수 */}
      <div style={{ position: 'relative', marginBottom: 6 }}>
        <input
          type="text"
          placeholder="닉네임 (2~10자)"
          value={nickname}
          maxLength={10}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={e => setNickname(e.target.value)}
          style={{
            width: '100%',
            padding: '13px 16px',
            borderRadius: 12,
            border: isError ? '1.5px solid #FF6B6B' : isFocused ? '1.5px solid #EBA8A6' : '1.5px solid #EBA8A6',
            fontSize: '1rem',
            outline: 'none',
            background: isError ? '#FFF0F0' : '#fff',
            transition: 'border 0.2s, background 0.2s',
            boxSizing: 'border-box',
          }}
        />
        <span style={{
          position: 'absolute',
          right: 12,
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: '0.97rem',
          color: isError ? '#FF6B6B' : '#aaa',
        }}>
          {nickname.length}/10
        </span>
      </div>
      {/* 에러 메시지 */}
      {isError && (
        <div style={{ color: '#FF6B6B', fontSize: '0.95rem', marginBottom: 4 }}>
          닉네임은 2~10자로 입력해 주세요
        </div>
      )}
    </div>
  );
} 