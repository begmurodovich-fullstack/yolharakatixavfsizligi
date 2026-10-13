import * as React from 'react';
import { cn } from '@/lib/cn';
import { evaluateScore } from '@/lib/scoreRules';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  max?: number;
  showColorByScore?: boolean;
}

export function Progress({
  value,
  max = 100,
  showColorByScore = false,
  className,
  ...props
}: ProgressProps) {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));
  const evalScore = max === 5.0 ? value : (value / max) * 5.0;
  const evalResult = evaluateScore(evalScore);

  const fillColor = showColorByScore ? evalResult.bgClass : 'bg-slate-900';

  return (
    <div
      className={cn(
        'relative h-2.5 w-full overflow-hidden rounded-full bg-slate-100',
        className
      )}
      {...props}
    >
      <div
        className={cn('h-full w-full flex-1 transition-all duration-300', fillColor)}
        style={{ transform: `translateX(-${100 - percentage}%)` }}
      />
    </div>
  );
}
