import { memo } from 'react';
import { Switch } from '@mui/material';

const Toggle = memo(
  ({
    checked = false,
    onChange,
    label,
    disabled = false,
    color = 'primary',
    size = 'medium',
    ...props
  }) => {
    return (
      <Switch
        checked={checked}
        onChange={onChange}
        disabled={disabled}
        color={color}
        size={size}
        {...props}
      />
    );
  },
);

Toggle.displayName = 'Toggle';

export default Toggle;
