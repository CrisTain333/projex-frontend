import { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { Button } from './Button';

interface EmptyStateActionConfig {
  label: string;
  onClick: () => void;
}

interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: EmptyStateActionConfig | ReactNode;
  className?: string;
}

export function EmptyState({
  icon,
  title,
  description,
  action,
  className,
}: EmptyStateProps) {
  const renderAction = () => {
    if (!action) return null;

    // Check if action is a config object with label and onClick
    if (typeof action === 'object' && action !== null && 'label' in action && 'onClick' in action) {
      const actionConfig = action as EmptyStateActionConfig;
      return (
        <Button onClick={actionConfig.onClick}>
          {actionConfig.label}
        </Button>
      );
    }

    // Otherwise, render it as a ReactNode
    return action;
  };

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center py-12 px-4 text-center',
        className
      )}
    >
      {icon && (
        <div className="w-16 h-16 mb-6 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-500">
          {icon}
        </div>
      )}
      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
        {title}
      </h3>
      {description && (
        <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm mb-6">
          {description}
        </p>
      )}
      {renderAction()}
    </div>
  );
}
