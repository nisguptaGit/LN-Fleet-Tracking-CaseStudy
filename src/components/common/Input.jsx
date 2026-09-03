import { memo } from 'react';
import { TextField } from '@mui/material';

const Input = memo(
  ({
    label,
    type = 'text',
    variant = 'outlined',
    size = 'small',
    ...props
  }) => {
    return (
      <TextField
        label={label}
        type={type}
        variant={variant}
        size={size}
        {...props}
      />
    );
  },
);

Input.displayName = 'Input';

export default Input;
