import Image from "next/image";

export default function Home() {
  return (
    <div className="relative w-[390px] h-[844px] bg-[#F1F1F1]">
      {/* 상단 네비게이션 바 */}
      <nav className="absolute w-[390px] h-[60px] left-0 top-0 bg-white flex flex-row justify-between items-center px-4 py-2.5">
        <div className="m-auto w-[140px] h-[34px] font-bold text-[28px] leading-[34px] text-[#F55C57]">
          MatchMate
        </div>
        <div className="m-auto w-10 h-10 bg-[#CCCCCC] rounded-full" />
      </nav>

      {/* 메인 카드 */}
      <div className="absolute w-[350px] h-[600px] left-5 top-20 bg-white border border-[#E6E6E6] rounded-[20px] flex flex-col items-center p-2.5">
        {/* 프로필 이미지 */}
        <div className="w-[350px] h-[450px] bg-[#E6E6E6]" />

        {/* 프로필 정보 */}
        <div className="w-[350px] h-[150px] bg-white flex flex-col items-start p-4 pt-4 pb-2.5">
          <div className="w-[86px] h-[29px] font-bold text-2xl leading-[29px] text-[#1A1A1A]">
            김지민, 28
          </div>
          <div className="w-[108px] h-[19px] text-base leading-[19px] text-[#808080]">
            UI/UX 디자이너
          </div>
          <div className="w-[439px] h-[17px] text-sm leading-[17px] text-[#4D4D4D]">
            안녕하세요! 새로운 사람들과 만나는 것을 좋아합니다.
          </div>
        </div>
      </div>

      {/* 액션 버튼 영역 */}
      <div className="absolute w-[390px] h-[100px] left-0 top-[700px] bg-white flex flex-row justify-center items-center p-2.5 gap-5">
        {/* 거절 버튼 */}
        <button className="w-[60px] h-[60px] bg-white border-2 border-[#E64D4D] rounded-[30px] flex flex-col justify-center items-center p-2.5">
          <span className="w-[21px] h-[34px] font-bold text-[28px] leading-[34px] text-[#E64D4D]">
            ✕
          </span>
        </button>

        {/* 좋아요 버튼 */}
        <button className="w-[60px] h-[60px] bg-white border-2 border-[#4DE680] rounded-[30px] flex flex-col justify-center items-center p-2.5">
          <span className="w-[29px] h-[34px] font-bold text-[28px] leading-[34px] text-[#4DE680]">
            ♥
          </span>
        </button>
      </div>

      {/* 하단 탭 네비게이션 */}
      <nav className="absolute w-[390px] h-[60px] left-0 top-[784px] bg-white border border-[#E6E6E6] flex flex-row justify-between items-center p-2.5">
        <div className="m-auto w-[26px] h-[29px] text-2xl leading-[29px] text-[#F55C57]">
          🏠
        </div>
        <div className="m-auto w-[23px] h-[29px] text-2xl leading-[29px] text-[#B3B3B3]">
          💬
        </div>
        <div className="m-auto w-[26px] h-[29px] text-2xl leading-[29px] text-[#B3B3B3]">
          👤
        </div>
      </nav>
    </div>
  );
}
