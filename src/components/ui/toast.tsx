'use client';

import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { cn } from '@/lib/cn';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toast: (options: { message: string; title?: string; type?: ToastType }) => void;
  success: (message: string, title?: string) => void;
  error: (message: string, title?: string) => void;
  info: (message: string, title?: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    ({ message, title, type = 'info' }: { message: string; title?: string; type?: ToastType }) => {
      const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`;
      setToasts((prev) => [...prev, { id, title, message, type }]);

      setTimeout(() => {
        removeToast(id);
      }, 4000);
    },
    [removeToast]
  );

  const success = useCallback((message: string, title?: string) => toast({ message, title, type: 'success' }), [toast]);
  const error = useCallback((message: string, title?: string) => toast({ message, title, type: 'error' }), [toast]);
  const info = useCallback((message: string, title?: string) => toast({ message, title, type: 'info' }), [toast]);

  return (
    <ToastContext.Provider value={{ toast, success, error, info }}>
      {children}
      <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md w-full pointer-events-none p-4">
        {toasts.map((t) => {
          let Icon = Info;
          let borderBg = 'bg-white border-slate-200 text-slate-900';
          let iconColor = 'text-blue-500';

          if (t.type === 'success') {
            Icon = CheckCircle2;
            iconColor = 'text-emerald-600';
            borderBg = 'bg-white border-emerald-200 text-slate-900 shadow-lg';
          } else if (t.type === 'error') {
            Icon = AlertCircle;
            iconColor = 'text-rose-600';
            borderBg = 'bg-white border-rose-200 text-slate-900 shadow-lg';
          }

          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto flex items-start gap-3 rounded-lg border p-4 shadow-md transition-all animate-in slide-in-from-bottom-5',
                borderBg
              )}
            >
              <Icon className={cn('h-5 w-5 mt-0.5 shrink-0', iconColor)} />
              <div className="flex-1 text-sm">
                {t.title && <div className="font-semibold text-slate-900">{t.title}</div>}
                <div className="text-slate-600">{t.message}</div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-slate-400 hover:text-slate-600 -mr-1 -mt-1 p-1 rounded"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
