import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle2, Info, AlertCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useApp();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        const isSuccess = toast.type === 'success';
        const isWarning = toast.type === 'warning';

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto p-4 rounded-xl shadow-lg border text-xs flex items-start justify-between gap-3 backdrop-blur-md transition-all animate-in fade-in slide-in-from-bottom-2 ${
              isSuccess
                ? 'bg-[#1C2C20]/95 text-white border-[#31563B]'
                : isWarning
                ? 'bg-[#FFF9F2] text-[#8C602D] border-[#F0DDC5]'
                : 'bg-[#24392B]/95 text-white border-[#35513D]'
            }`}
          >
            <div className="flex items-start gap-2.5">
              {isSuccess ? (
                <CheckCircle2 className="w-4 h-4 text-[#9FE2A7] shrink-0 mt-0.5" />
              ) : isWarning ? (
                <AlertCircle className="w-4 h-4 text-[#C04838] shrink-0 mt-0.5" />
              ) : (
                <Info className="w-4 h-4 text-[#DDA76A] shrink-0 mt-0.5" />
              )}
              <div>
                <p className="font-semibold text-xs leading-snug">{toast.title}</p>
                <p className="text-[11px] opacity-90 mt-0.5 leading-relaxed">{toast.message}</p>
              </div>
            </div>

            <button
              onClick={() => removeToast(toast.id)}
              className="p-1 opacity-70 hover:opacity-100 transition-opacity"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
