export function formatTime(isoString?: string) {
  if (!isoString) return '';
  const date = new Date(isoString);
  // 예시: '오후 2:30' 또는 '2024-06-13'
  const now = new Date();
  if (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  ) {
    // 오늘이면 시:분만
    return date.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' });
  }
  // 오늘이 아니면 날짜
  return date.toLocaleDateString('ko-KR');
}