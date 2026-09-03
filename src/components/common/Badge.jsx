import { memo } from 'react';
import { Chip } from '@mui/material';

const Badge = memo(
  ({
    label,
    variant = 'filled',
    color = 'default',
    icon,
    onDelete,
    children,
    ...props
  }) => {
    return (
      <Chip
        label={label}
        variant={variant}
        color={color}
        icon={icon}
        onDelete={onDelete}
        {...props}
      >
        {children}{' '}
      </Chip>
    );
  },
);

Badge.displayName = 'Badge';

export default Badge;
