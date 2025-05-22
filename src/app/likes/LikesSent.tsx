export default function LikesSent() {
  return (
    <div className="likes-sent-container">
      {/* 상단바 */}
      <header className="top-bar">
        <span className="title">보낸 좋아요</span>
      </header>

      {/* 좋아요 보낸 유저 리스트 */}
      <ul className="likes-list">
        <li className="like-item">
          <div className="profile-img">
            <img src="/images/profile3.jpg" alt="프로필" />
          </div>
          <div className="user-info">
            <span className="user-name">박서준, 30</span>
            <span className="user-desc">대전, 마케터</span>
          </div>
          <button className="like-btn">♥</button>
        </li>
        {/* 반복되는 좋아요 아이템 예시 */}
        <li className="like-item">
          <div className="profile-img">
            <img src="/images/profile4.jpg" alt="프로필" />
          </div>
          <div className="user-info">
            <span className="user-name">최유리, 26</span>
            <span className="user-desc">광주, 디자이너</span>
          </div>
          <button className="like-btn">♥</button>
        </li>
      </ul>
    </div>
  );
} 