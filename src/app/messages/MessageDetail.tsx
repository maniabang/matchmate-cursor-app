export default function MessageDetail() {
  return (
    <div className="message-detail-container">
      {/* 상단바 */}
      <header className="top-bar">
        <button className="back-btn">←</button>
        <span className="title">홍길동</span>
        <button className="more-btn">⋮</button>
      </header>

      {/* 메시지 대화 영역 */}
      <div className="chat-area">
        <div className="chat-message received">
          <div className="bubble">안녕하세요!</div>
          <div className="time">오후 2:30</div>
        </div>
        <div className="chat-message sent">
          <div className="bubble">안녕하세요! 반가워요 :)</div>
          <div className="time">오후 2:31</div>
        </div>
        {/* ...반복되는 메시지... */}
      </div>

      {/* 입력창 */}
      <div className="chat-input-bar">
        <input type="text" className="chat-input" placeholder="메시지 입력..." />
        <button className="send-btn">전송</button>
      </div>
    </div>
  );
} 