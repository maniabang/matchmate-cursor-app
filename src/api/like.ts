import { useMutation } from '@tanstack/react-query';
import { UseMutationOptions, UseMutationResult } from '@tanstack/react-query';

export interface LikeRequest {
  senderId: string;
  receiverId: string;
}

export async function sendLike<TVariables extends LikeRequest>(variables: TVariables) {
  const { senderId, receiverId } = variables;
  const res = await fetch('/api/like', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId }),
  });
  if (!res.ok) throw new Error('좋아요 전송 실패');
  return res.json();
}

export function useSendLike<TData = any, TError = Error, TVariables extends LikeRequest = LikeRequest, TContext = unknown>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: sendLike,
    ...options,
  });
} 