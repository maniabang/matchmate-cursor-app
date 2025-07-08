import { useMutation } from '@tanstack/react-query';

export async function sendLike({ senderId, receiverId }: { senderId: string, receiverId: string }) {
  const res = await fetch('/api/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId }),
  });
  if (!res.ok) throw new Error('좋아요 전송 실패');
  return res.json();
}

export function useSendLike(options?: any) {
  return useMutation({
    mutationFn: sendLike,
    ...options,
  });
} 