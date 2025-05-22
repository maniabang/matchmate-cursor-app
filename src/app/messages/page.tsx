import MessageList from './MessageList';
import NavBar from "../components/NavBar";

export default function MessagesPage() {
  return (
    <>
      <NavBar title="메시지" />
      <MessageList />
    </>
  );
} 