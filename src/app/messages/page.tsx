import MessageList from './MessageList';
import NavBar from "../home/NavBar";
import BottomNav from "../components/BottomNav";

export default function MessagesPage() {
  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#fff' }}>
      {/* 상단 고정 NavBar */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <NavBar title="메시지" />
      </div>
      {/* 메시지 리스트 (상하단 패딩) */}
      <div style={{
        paddingTop: 56, // NavBar 높이
        paddingBottom: 60, // BottomNav 높이
        height: '100vh',
        overflowY: 'auto',
      }}>
        <MessageList />
      </div>
      {/* 하단 고정 BottomNav */}
      <div style={{ position: 'fixed', bottom: 0, left: 0, width: '100vw', zIndex: 10 }}>
        <BottomNav activeTab="messages" />
      </div>
    </div>
  );
} 