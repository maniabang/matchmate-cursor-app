export type ChatMessage = {
  id: string;
  sender: 'me' | 'other';
  text: string;
  time: string;
  unread?: boolean;
};

export type Conversation = {
  userId: string; // 상대방 id
  messages: ChatMessage[];
};

export const conversations: Conversation[] = [
  {
    userId: '1',
    messages: [
      { id: 'c1', sender: 'other', text: '안녕하세요! 오늘 저녁에 시간 괜찮으세요?', time: '오후 2:30', unread: true },
      { id: 'c2', sender: 'me', text: '네! 저녁 7시쯤 괜찮아요!', time: '오후 2:32' },
      { id: 'c3', sender: 'other', text: '좋아요! 그때 봬요 :)', time: '오후 2:33' },
    ],
  },
  {
    userId: '2',
    messages: [
      { id: 'c1', sender: 'me', text: '지민님, 도착하시면 연락 주세요!', time: '오후 1:12' },
      { id: 'c2', sender: 'other', text: '네! 곧 도착해요~', time: '오후 1:13', unread: true },
    ],
  },
  {
    userId: '3',
    messages: [
      { id: 'c1', sender: 'other', text: '오늘 날씨 너무 좋네요~', time: '오전 11:45' },
      { id: 'c2', sender: 'me', text: '맞아요! 산책하기 딱이에요.', time: '오전 11:46' },
    ],
  },
  {
    userId: '4',
    messages: [
      { id: 'c1', sender: 'me', text: '사진 잘 받으셨나요?', time: '오전 10:21' },
      { id: 'c2', sender: 'other', text: '네! 감사합니다 :)', time: '오전 10:22', unread: true },
    ],
  },
  {
    userId: '5',
    messages: [
      { id: 'c1', sender: 'other', text: '혹시 주말에 시간 되세요?', time: '어제' },
      { id: 'c2', sender: 'me', text: '네! 시간 괜찮아요.', time: '어제' },
    ],
  },
]; 