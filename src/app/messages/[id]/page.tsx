export default function MessageDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">메시지 상세</h1>
      <div className="max-w-2xl mx-auto">
        {/* 메시지 ID: {params.id} 에 해당하는 채팅 내용이 표시됩니다 */}
      </div>
    </div>
  );
} 