export type Message = {
  id: string;
  profile: string;
  name: string;
  preview: string;
  time: string;
  unread: number;
};

export const messages: Message[] = [
  {
    id: '1',
    profile: '',
    name: '이수진',
    preview: '안녕하세요! 오늘 저녁에 시간 괜찮으세요?',
    time: '오후 2:30',
    unread: 2,
  },
  {
    id: '2',
    profile: '',
    name: '김지민',
    preview: '네! 곧 출발할게요 :)',
    time: '오후 1:10',
    unread: 1,
  },
  {
    id: '3',
    profile: '',
    name: '박소연',
    preview: '오늘 날씨 너무 좋네요~',
    time: '오전 11:45',
    unread: 3,
  },
  {
    id: '4',
    profile: '',
    name: '최유리',
    preview: '사진 잘 받았어요! 감사합니다.',
    time: '오전 10:20',
    unread: 3,
  },
  {
    id: '5',
    profile: '',
    name: '정하은',
    preview: '혹시 주말에 시간 되세요?',
    time: '어제',
    unread: 3,
  },
]; 