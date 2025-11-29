import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/utils/cn';
import { getInitials } from '@/utils/formatters';

const avatarVariants = cva(
  'relative inline-flex items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden',
  {
    variants: {
      size: {
        xs: 'h-6 w-6 text-xs',
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-sm',
        lg: 'h-12 w-12 text-base',
        xl: 'h-16 w-16 text-lg',
      },
    },
    defaultVariants: {
      size: 'md',
    },
  }
);

export interface AvatarProps extends VariantProps<typeof avatarVariants> {
  src?: string | null;
  name: string;
  className?: string;
}

export function Avatar({ src, name, size, className }: AvatarProps) {
  const initials = getInitials(name);

  if (src) {
    return (
      <div className={cn(avatarVariants({ size }), className)}>
        <img
          src={src}
          alt={name}
          className="h-full w-full object-cover"
          onError={(e) => {
            // Hide image on error and show initials instead
            e.currentTarget.style.display = 'none';
          }}
        />
        {/* Fallback initials (hidden by default, shown when image fails) */}
        <span className="absolute inset-0 flex items-center justify-center font-medium text-gray-600 dark:text-gray-300">
          {initials}
        </span>
      </div>
    );
  }

  return (
    <div className={cn(avatarVariants({ size }), className)}>
      <span className="font-medium text-gray-600 dark:text-gray-300">
        {initials}
      </span>
    </div>
  );
}

// Avatar Group for showing multiple avatars
interface AvatarGroupProps {
  users: Array<{ name: string; avatar?: string | null }>;
  max?: number;
  size?: 'xs' | 'sm' | 'md' | 'lg';
  className?: string;
}

export function AvatarGroup({ users, max = 3, size = 'sm', className }: AvatarGroupProps) {
  const visibleUsers = users.slice(0, max);
  const remaining = users.length - max;

  return (
    <div className={cn('flex -space-x-2', className)}>
      {visibleUsers.map((user, index) => (
        <Avatar
          key={index}
          src={user.avatar}
          name={user.name}
          size={size}
          className="ring-2 ring-white dark:ring-gray-900"
        />
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            avatarVariants({ size }),
            'ring-2 ring-white dark:ring-gray-900 bg-gray-300 dark:bg-gray-600'
          )}
        >
          <span className="font-medium text-gray-600 dark:text-gray-300">
            +{remaining}
          </span>
        </div>
      )}
    </div>
  );
}
