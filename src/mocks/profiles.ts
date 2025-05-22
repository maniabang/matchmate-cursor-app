export type UserProfile = {
  id: string;
  name: string;
  age: number;
  region: string;
  job: string;
  intro: string;
  profile: string;
};

export const profiles: UserProfile[] = [
  {
    id: '1',
    name: '이수진',
    age: 28,
    region: '서울',
    job: '디자이너',
    intro: '안녕하세요! 새로운 만남을 기대하고 있어요 :)',
    profile: '',
  },
  {
    id: '2',
    name: '김지민',
    age: 27,
    region: '부산',
    job: '마케터',
    intro: '밝고 긍정적인 에너지를 가진 지민입니다!',
    profile: '',
  },
  {
    id: '3',
    name: '박소연',
    age: 26,
    region: '대구',
    job: '개발자',
    intro: '코딩과 여행을 좋아해요~',
    profile: '',
  },
  {
    id: '4',
    name: '최유리',
    age: 29,
    region: '인천',
    job: '교사',
    intro: '아이들과 함께하는 시간이 즐거워요.',
    profile: '',
  },
  {
    id: '5',
    name: '정하은',
    age: 25,
    region: '광주',
    job: '간호사',
    intro: '따뜻한 마음으로 다가가고 싶어요.',
    profile: '',
  },
]; 