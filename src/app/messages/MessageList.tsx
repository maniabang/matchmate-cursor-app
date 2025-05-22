export default function MessageList() {
  return (
    <div className="message-list-container">
      {/* 상단바 */}
      <header className="top-bar">
        <span className="title">메시지</span>
        <button className="search-btn">🔍</button>
      </header>

      {/* 메시지 리스트 */}
      <ul className="message-list">
        <li className="message-item">
          <div className="profile-img">
            <img src="/images/profile1.jpg" alt="프로필" />
          </div>
          <div className="message-info">
            <div className="message-header">
              <span className="user-name">홍길동</span>
              <span className="message-time">오후 2:30</span>
            </div>
            <div className="message-preview">안녕하세요! 오늘 약속 괜찮으세요?</div>
          </div>
          <div className="unread-badge">2</div>
        </li>
        {/* 반복되는 메시지 아이템 예시 */}
        <li className="message-item">
          <div className="profile-img">
            <img src="/images/profile2.jpg" alt="프로필" />
          </div>
          <div className="message-info">
            <div className="message-header">
              <span className="user-name">김지민</span>
              <span className="message-time">오후 1:10</span>
            </div>
            <div className="message-preview">네! 곧 출발할게요 :)</div>
          </div>
          <div className="unread-badge">1</div>
        </li>
      </ul>
    </div>
  );
} 