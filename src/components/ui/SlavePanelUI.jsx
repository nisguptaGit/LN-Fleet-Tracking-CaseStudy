import { memo } from 'react';
import { Box, Typography, Stack, Button, Divider } from '@mui/material';

const SlavePanelUI = memo(
  ({
    title = 'Slave Panel',
    viewType = 'list',
    onViewChange,
    children,
    toolbar,
    ...props
  }) => {
    return (
      <Box
        sx={{
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 1,
          boxShadow: 1,
          height: '100%',
          overflow: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        {...props}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant='h6' sx={{ fontWeight: 600 }}>
            {title}
          </Typography>

          {onViewChange && (
            <Stack direction='row' spacing={1}>
              <Button
                size='small'
                variant={viewType === 'list' ? 'contained' : 'outlined'}
                onClick={() => onViewChange('list')}
              >
                List
              </Button>
              <Button
                size='small'
                variant={viewType === 'card' ? 'contained' : 'outlined'}
                onClick={() => onViewChange('card')}
              >
                Card
              </Button>
            </Stack>
          )}
        </Box>

        {toolbar && (
          <>
            <Box sx={{ mb: 2 }}>{toolbar} nnunn</Box>
            <Divider sx={{ mb: 2 }} />
          </>
        )}

        <Box sx={{ flex: 1, overflow: 'auto' }}>{children}</Box>
      </Box>
    );
  },
);

SlavePanelUI.displayName = 'SlavePanelUI';

export default SlavePanelUI;
