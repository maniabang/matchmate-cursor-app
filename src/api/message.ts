import { useMutation, UseMutationOptions, UseMutationResult } from '@tanstack/react-query';
import { useQuery } from '@tanstack/react-query';

export interface MessageRequest {
  senderId: string;
  receiverId: string;
  content: string;
}


export async function forceMatchAndSendMessage(variables: MessageRequest) {
  const { senderId, receiverId, content } = variables;
  const res = await fetch('/api/messages', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ senderId, receiverId, content }),
  });
  if (!res.ok) throw new Error('메시지 전송 실패');
  return res.json();
}

export function useForceMatchAndSendMessage<TData = any, TError = Error, TVariables = MessageRequest, TContext = unknown>(
  options?: UseMutationOptions<TData, TError, TVariables, TContext>
): UseMutationResult<TData, TError, TVariables, TContext> {
  return useMutation<TData, TError, TVariables, TContext>({
    mutationFn: forceMatchAndSendMessage as any,
    ...options,
  });
}

// 메시지 목록 GET (상대방과의 대화 내역)
export async function fetchMessages(partnerId: string) {
  const res = await fetch(`/api/messages?partnerId=${partnerId}`);
  if (!res.ok) throw new Error('메시지 불러오기 실패');
  return res.json();
}

export function useMessages(partnerId: string) {
  return useQuery({
    queryKey: ['messages', partnerId],
    queryFn: () => fetchMessages(partnerId),
    enabled: !!partnerId,
  });
}