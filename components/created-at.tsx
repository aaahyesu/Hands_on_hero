import "moment/locale/ko";
interface CreatedAtProps {
  date?: Date | string;
  size: string;
  style?: string;
}

interface CreatedAtProps {
  date?: Date | string;
  size: string;
  style?: string;
}

const CreatedAt = ({ date, size, style }: CreatedAtProps) => {
  // Date 객체로 변환
  const currentDate: Date = new Date();
  const createdDate: Date = date ? new Date(date) : currentDate;

  // 두 날짜 사이의 차이를 계산
  const timeDiff: number = currentDate.getTime() - createdDate.getTime(); // getTime()으로 밀리초(ms) 값을 얻음

  // 밀리초(ms)를 분, 시간 등으로 변환
  const minutes: number = Math.floor(timeDiff / (1000 * 60)); // 1분 = 60,000 밀리초
  const hours: number = Math.floor(minutes / 60);
  const days: number = Math.floor(hours / 24);

  // 표시할 문자열 생성
  let parsedCreatedAt: string = "방금 전";

  if (days > 0) {
    parsedCreatedAt = `${days}일 전`;
  } else if (hours > 0) {
    parsedCreatedAt = `${hours}시간 전`;
  } else if (minutes > 0) {
    parsedCreatedAt = `${minutes}분 전`;
  }

  return (
    <span className={`${size} ${style} text-gray-400`}>{parsedCreatedAt}</span>
  );
};

export default CreatedAt;
