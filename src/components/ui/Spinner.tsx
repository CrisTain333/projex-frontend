import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';

const spinnerVariants = cva('animate-spin', {
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
      xl: 'h-12 w-12',
    },
    color: {
      default: 'text-gray-400',
      primary: 'text-brand-orange',
      white: 'text-white',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

export interface SpinnerProps extends VariantProps<typeof spinnerVariants> {
  className?: string;
}

export function Spinner({ size, color, className }: SpinnerProps) {
  return (
    <svg
      className={cn(spinnerVariants({ size, color }), className)}
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      />
    </svg>
  );
}

// Full page loading spinner
export function LoadingScreen() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-gray-900">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="xl" color="primary" />
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

// Inline loading spinner with text
interface LoadingInlineProps {
  text?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingInline({ text = 'Loading...', size = 'sm' }: LoadingInlineProps) {
  return (
    <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
      <Spinner size={size} />
      <span className="text-sm">{text}</span>
    </div>
  );
}
