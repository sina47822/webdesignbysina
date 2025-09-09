'use client';

import { useState } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';
import { ArrowLeft } from 'lucide-react';

export interface CardFlipProps {
  className?: string;
  title: string;
  subtitle?: string;
  description: string;
  icon?: React.ReactNode | LucideIcon;
  link?: string;
  ctaText?: string;
  hoverFlip?: boolean;
}

export default function CardFlip2({
  className,
  title,
  subtitle,
  description,
  icon,
  link,
  ctaText = 'Start',
  hoverFlip = true,
}: CardFlipProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleEnter = () => hoverFlip && setIsFlipped(true);
  const handleLeave = () => hoverFlip && setIsFlipped(false);

  const renderIcon = () => {
    if (!icon) return null;
    if (typeof icon === 'function') {
      const IconComp = icon as LucideIcon;
      return <IconComp className="h-6 w-6 text-white" />;
    }
    return icon;
  };

  return (
    <div
      className={cn(
        // ✅ perspective را برگرداندیم
        'group relative h-[360px] w-full [perspective:2000px]',
        // ✅ اجازه‌ی انعطاف‌پذیری
        'flex-1 min-w-[260px]',
        className
      )}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <div
        className={cn(
          'relative h-full w-full',
          '[transform-style:preserve-3d]',
          'transition-all duration-700',
          isFlipped ? '[transform:rotateY(180deg)]' : '[transform:rotateY(0deg)]'
        )}
      >
        {/* FRONT */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(0deg)] [backface-visibility:hidden]',
            'overflow-hidden rounded-2xl',
            'bg-gradient-to-br from-white via-slate-50 to-slate-100',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800/50',
            'shadow-lg dark:shadow-xl',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            isFlipped ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 bg-gradient-to-br via-transparent to-blue-500/5 dark:to-blue-500/10" />

          <div className="absolute inset-0 flex items-center justify-center pt-16">
            <div className="relative flex h-24 w-24 items-center justify-center">
              <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary via-primary/90 to-primary/80 flex items-center justify-center shadow-primary/25 shadow-lg animate-pulse transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                {renderIcon()}
              </div>
            </div>
          </div>

          <div className="absolute right-0 bottom-0 left-0 p-5">
            <div className="flex items-center justify-between gap-3">
              <div className="space-y-1.5">
                <h3 className="text-lg leading-snug font-semibold tracking-tight text-zinc-900 dark:text-white">
                  {title}
                </h3>
                {subtitle ? (
                  <p className="line-clamp-2 text-sm tracking-tight text-zinc-600 dark:text-zinc-300">
                    {subtitle}
                  </p>
                ) : null}
              </div>
              <span className="h-2.5 w-2.5 rounded-full bg-primary/80 shadow-inner shadow-primary/30" />
            </div>
          </div>
        </div>

        {/* BACK */}
        <div
          className={cn(
            'absolute inset-0 h-full w-full',
            '[transform:rotateY(180deg)] [backface-visibility:hidden]',
            'rounded-2xl p-5',
            'bg-gradient-to-br from-white via-slate-50 to-slate-100',
            'dark:from-zinc-900 dark:via-zinc-900/95 dark:to-zinc-800',
            'border border-slate-200 dark:border-zinc-800',
            'shadow-lg dark:shadow-xl',
            'flex flex-col',
            'transition-all duration-700',
            'group-hover:shadow-xl dark:group-hover:shadow-2xl',
            'group-hover:border-primary/20 dark:group-hover:border-primary/30',
            !isFlipped ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="from-primary/5 dark:from-primary/10 absolute inset-0 rounded-2xl bg-gradient-to-br via-transparent to-blue-500/5 dark:to-blue-500/10" />

          <div className="relative z-10 flex-1 space-y-4">
            <h4 className="text-base font-semibold text-zinc-900 dark:text-white">
              {title}
            </h4>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          </div>

          <div className="relative z-10 mt-auto border-t border-slate-200 pt-4 dark:border-zinc-800">
            {link ? (
              <Link
                href={link}
                className={cn(
                  'group/start relative flex items-center justify-between rounded-lg p-2.5',
                  'transition-all duration-300',
                  'bg-gradient-to-r from-slate-100 via-slate-100 to-slate-100',
                  'dark:from-zinc-800 dark:via-zinc-800 dark:to-zinc-800',
                  'hover:from-primary/10 hover:via-primary/5 hover:to-transparent',
                  'dark:hover:from-primary/20 dark:hover:via-primary/10 dark:hover:to-transparent',
                  'hover:scale-[1.02] hover:cursor-pointer hover:border-primary/20 border border-transparent'
                )}
              >
                <span className="group-hover/start:text-primary text-sm font-semibold text-zinc-900 dark:text-white transition-colors duration-300">
                  {ctaText}
                </span>
                <ArrowLeft className="text-primary h-4 w-4 transition-all duration-300 group-hover/start:translate-x-1 group-hover/start:scale-110" />
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
