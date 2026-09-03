import { memo } from 'react';
import { Box, LinearProgress, Typography } from '@mui/material';
const getProgressColor = (value) => {
  if (value <= 30) return 'error';
  if (value <= 60) return 'warning';
  return 'success';
};

const ProgressBar = memo(({ value = 0, children, ...props }) => {
  const normalizedValue = Math.min(Math.max(value, 0), 100);
  const progressColor = getProgressColor(normalizedValue);

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', width: '100%', gap: 1.5 }}
    >
      {children ? <Box sx={{ flexShrink: 0 }}>{children}</Box> : null}

      <Box sx={{ flexGrow: 1 }}>
        <LinearProgress
          variant='determinate'
          value={normalizedValue}
          color={progressColor}
          {...props}
        />
      </Box>

      <Box sx={{ minWidth: 35, textAlign: 'right', flexShrink: 0 }}>
        <Typography variant='body2' sx={{ color: 'text.secondary' }}>
          {`${Math.round(normalizedValue)}%`}
        </Typography>
      </Box>
    </Box>
  );
});

ProgressBar.displayName = 'ProgressBar';

export default ProgressBar;
