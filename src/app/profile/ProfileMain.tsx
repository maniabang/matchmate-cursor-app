export default function ProfileMain() {
  return (
    <div className="profile-main-container">
      {/* 상단바 */}
      <header className="top-bar">
        <span className="title">내 프로필</span>
        <button className="edit-btn">수정</button>
      </header>

      {/* 프로필 정보 */}
      <section className="profile-info">
        <div className="profile-img">
          <img src="/images/profile-default-male.svg" alt="프로필" />
        </div>
        <div className="profile-name">이광훈, 35</div>
        <div className="profile-desc">수원, 개발자</div>
      </section>

      {/* 프로필 상세/기타 정보 */}
      <section className="profile-detail">
        <div className="profile-detail-item">
          <span className="label">소개</span>
          <span className="value">안녕하세요! 새로운 사람들과 만나는 것을 좋아합니다.</span>
        </div>
        {/* 필요시 추가 정보 */}
      </section>
    </div>
  );
} 