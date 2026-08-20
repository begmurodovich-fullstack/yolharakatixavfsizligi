import React from 'react';
import { cn } from '@/lib/cn';
import { AlertOctagon, RotateCw } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
}

export function ErrorState({
  title = "Xatolik yuz berdi",
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center p-8 text-center rounded-xl border border-rose-200 bg-rose-50/40',
        className
      )}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-600 mb-3">
        <AlertOctagon className="h-6 w-6" />
      </div>
      <h3 className="text-sm font-semibold text-rose-950">{title}</h3>
      <p className="mt-1 text-sm text-rose-700 max-w-sm">{message}</p>
      {onRetry && (
        <Button
          size="sm"
          variant="outline"
          className="mt-4 border-rose-300 text-rose-800 hover:bg-rose-100"
          onClick={onRetry}
        >
          <RotateCw className="w-3.5 h-3.5 mr-1.5" />
          Qayta urinish
        </Button>
      )}
    </div>
  );
}
