import { memo } from 'react';
import { Box, Typography, Stack, Button } from '@mui/material';

const MasterPanelUI = memo(({ title = 'Master Panel', children, ...props }) => {
  return (
    <Box
      sx={{
        p: 2,
        bgcolor: 'background.paper',
        borderRadius: 1,
        boxShadow: 1,
        height: '100%',
        overflow: 'auto',
      }}
      {...props}
    >
      {title && (
        <Typography variant='h6' sx={{ mb: 2, fontWeight: 600 }}>
          {title}
        </Typography>
      )}

      <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
    </Box>
  );
});

MasterPanelUI.displayName = 'MasterPanelUI';

export default MasterPanelUI;
