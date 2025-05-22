export default function ProfileEdit() {
  return (
    <div className="profile-edit-container">
      {/* 상단바 */}
      <header className="top-bar">
        <span className="title">프로필 편집</span>
        <button className="save-btn">저장</button>
      </header>

      {/* 프로필 이미지 변경 */}
      <section className="profile-img-edit">
        <div className="profile-img">
          <img src="/images/profile-main.jpg" alt="프로필" />
        </div>
        <button className="img-edit-btn">이미지 변경</button>
      </section>

      {/* 프로필 정보 입력 폼 */}
      <form className="profile-form">
        <label>
          이름
          <input type="text" className="input" defaultValue="이광훈" />
        </label>
        <label>
          나이
          <input type="number" className="input" defaultValue="35" />
        </label>
        <label>
          지역
          <input type="text" className="input" defaultValue="수원" />
        </label>
        <label>
          직업
          <input type="text" className="input" defaultValue="개발자" />
        </label>
        <label>
          소개
          <textarea className="input" defaultValue="안녕하세요! 새로운 사람들과 만나는 것을 좋아합니다." />
        </label>
      </form>
    </div>
  );
} 