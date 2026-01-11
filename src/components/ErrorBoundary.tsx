'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { toast } from 'react-hot-toast';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: ((error: Error, errorInfo: ErrorInfo) => void) | undefined;
  showToast?: boolean;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('ErrorBoundary caught an error:', error, errorInfo);
    }

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Show toast notification if enabled
    if (this.props.showToast !== false) {
      toast.error('Something went wrong. Please try refreshing the page.');
    }

    // Update state with error info
    this.setState({
      error,
      errorInfo,
    });
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="mb-6">
              <svg
                className="mx-auto h-16 w-16 text-red-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.34 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            
            <h1 className="text-2xl font-bold text-[var(--text-primary)] mb-4">
              Oops! Something went wrong
            </h1>
            
            <p className="text-[var(--text-secondary)] mb-6">
              We're sorry, but something unexpected happened. Our team has been notified and is working to fix the issue.
            </p>

            {process.env.NODE_ENV === 'development' && this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm font-medium text-[var(--text-primary)] mb-2">
                  Error Details (Development)
                </summary>
                <div className="bg-[var(--card-background)] p-4 rounded-lg border border-border">
                  <pre className="text-xs text-[var(--text-secondary)] whitespace-pre-wrap">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </div>
              </details>
            )}

            <div className="space-y-3">
              <button
                onClick={() => window.location.reload()}
                className="w-full bg-[var(--button-primary)] hover:bg-[var(--button-primary-hover)] text-[var(--foreground)] px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Refresh Page
              </button>
              
              <button
                onClick={() => window.history.back()}
                className="w-full bg-transparent border border-[var(--border)] text-[var(--text-primary)] hover:bg-[var(--card-background)] px-6 py-3 rounded-lg font-medium transition-colors"
              >
                Go Back
              </button>
            </div>

            <div className="mt-6 text-sm text-[var(--text-secondary)]">
              <p>
                If the problem persists, please contact our support team at{' '}
                <a
                  href="mailto:support@victoai.com"
                  className="text-[var(--accent-cyan)] hover:underline"
                >
                  support@victoai.com
                </a>
              </p>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Hook for handling errors in functional components
 */
export function useErrorHandler() {
  const [error, setError] = React.useState<Error | null>(null);

  const handleError = React.useCallback((error: Error) => {
    setError(error);
    
    // Log error in development
    if (process.env.NODE_ENV === 'development') {
      console.error('useErrorHandler caught an error:', error);
    }
    
    // Show toast notification
    toast.error('Something went wrong. Please try again.');
  }, []);

  const clearError = React.useCallback(() => {
    setError(null);
  }, []);

  return {
    error,
    handleError,
    clearError,
    hasError: !!error,
  };
}

/**
 * Higher-order component for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}
