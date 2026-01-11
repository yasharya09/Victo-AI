import React from 'react';
import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'default' | 'primary' | 'accent' | 'white';
  className?: string;
  text?: string;
  showText?: boolean;
}

const sizeClasses = {
  sm: 'w-4 h-4',
  md: 'w-6 h-6',
  lg: 'w-8 h-8',
  xl: 'w-12 h-12',
};

const variantClasses = {
  default: 'text-[var(--text-secondary)]',
  primary: 'text-[var(--primary)]',
  accent: 'text-[var(--accent-cyan)]',
  white: 'text-white',
};

export function LoadingSpinner({
  size = 'md',
  variant = 'default',
  className,
  text = 'Loading...',
  showText = false,
}: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizeClasses[size],
          variantClasses[variant]
        )}
        role="status"
        aria-label="Loading"
      >
        <span className="sr-only">{text}</span>
      </div>
      {showText && (
        <p className={cn('mt-2 text-sm', variantClasses[variant])}>{text}</p>
      )}
    </div>
  );
}

interface LoadingDotsProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'primary' | 'accent' | 'white';
  className?: string;
}

const dotsSizeClasses = {
  sm: 'w-1.5 h-1.5',
  md: 'w-2 h-2',
  lg: 'w-3 h-3',
};

export function LoadingDots({
  size = 'md',
  variant = 'default',
  className,
}: LoadingDotsProps) {
  return (
    <div className={cn('flex space-x-1', className)}>
      {[0, 1, 2].map((index) => (
        <div
          key={index}
          className={cn(
            'rounded-full animate-pulse',
            dotsSizeClasses[size],
            variantClasses[variant]
          )}
          style={{
            animationDelay: `${index * 0.2}s`,
            animationDuration: '1.4s',
          }}
        />
      ))}
    </div>
  );
}

interface LoadingSkeletonProps {
  className?: string;
  lines?: number;
  height?: string;
}

export function LoadingSkeleton({
  className,
  lines = 3,
  height = 'h-4',
}: LoadingSkeletonProps) {
  return (
    <div className={cn('space-y-3', className)}>
      {Array.from({ length: lines }).map((_, index) => (
        <div
          key={index}
          className={cn(
            'animate-pulse bg-[var(--card-background)] rounded',
            height,
            index === lines - 1 ? 'w-3/4' : 'w-full'
          )}
        />
      ))}
    </div>
  );
}

interface LoadingOverlayProps {
  children?: React.ReactNode;
  isLoading: boolean;
  text?: string;
  className?: string;
}

export function LoadingOverlay({
  children,
  isLoading,
  text = 'Loading...',
  className,
}: LoadingOverlayProps) {
  if (!isLoading) return <>{children}</>;

  return (
    <div className={cn('relative', className)}>
      {children}
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center z-10">
        <LoadingSpinner size="lg" variant="primary" text={text} showText />
      </div>
    </div>
  );
}

interface LoadingButtonProps {
  children: React.ReactNode;
  loading: boolean;
  loadingText?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
}

export function LoadingButton({
  children,
  loading,
  loadingText = 'Loading...',
  disabled,
  className,
  onClick,
  type = 'button',
}: LoadingButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm transition-colors',
        'bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--foreground)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        className
      )}
    >
      {loading && (
        <LoadingSpinner size="sm" variant="white" className="mr-2" />
      )}
      {loading ? loadingText : children}
    </button>
  );
}
