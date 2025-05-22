export default function LikesReceived() {
  return (
    <div className="likes-received-container">
      {/* 상단바 */}
      <header className="top-bar">
        <span className="title">받은 좋아요</span>
      </header>

      {/* 좋아요 받은 유저 리스트 */}
      <ul className="likes-list">
        <li className="like-item">
          <div className="profile-img">
            <img src="/images/profile1.jpg" alt="프로필" />
          </div>
          <div className="user-info">
            <span className="user-name">홍길동, 27</span>
            <span className="user-desc">서울, 개발자</span>
          </div>
          <button className="like-btn">♥</button>
        </li>
        {/* 반복되는 좋아요 아이템 예시 */}
        <li className="like-item">
          <div className="profile-img">
            <img src="/images/profile2.jpg" alt="프로필" />
          </div>
          <div className="user-info">
            <span className="user-name">김지민, 28</span>
            <span className="user-desc">부산, 디자이너</span>
          </div>
          <button className="like-btn">♥</button>
        </li>
      </ul>
    </div>
  );
} 