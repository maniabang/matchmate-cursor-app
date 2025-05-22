"use client";
import { useModalStore } from '@/store/modalStore';

export default function Modal() {
  const { open, content, closeModal, props } = useModalStore();
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center relative">
        <button
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          onClick={() => {
            closeModal();
            props?.onCancel?.();
          }}
          aria-label="닫기"
        >
          ×
        </button>
        {/* 타이틀/설명/커스텀 content 모두 지원 */}
        {props?.title && <div className="font-bold text-lg mb-2 text-center">{props.title}</div>}
        {props?.description && <div className="text-base text-gray-700 mb-4 text-center">{props.description}</div>}
        {content}
        {/* 확인/취소 버튼이 props로 전달된 경우 */}
        {(props?.confirmText || props?.cancelText) && (
          <div className="flex gap-4 mt-4 w-full justify-center">
            {props.cancelText && (
              <button
                onClick={() => {
                  closeModal();
                  props?.onCancel?.();
                }}
                className="flex-1 py-2 rounded-full bg-gray-100 text-gray-500 font-semibold hover:bg-gray-200 transition"
              >
                {props.cancelText}
              </button>
            )}
            {props.confirmText && (
              <button
                onClick={() => {
                  closeModal();
                  props?.onConfirm?.();
                }}
                className="flex-1 py-2 rounded-full bg-[#EBA8A6] text-white font-semibold hover:bg-[#e07b7b] transition"
              >
                {props.confirmText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
} 