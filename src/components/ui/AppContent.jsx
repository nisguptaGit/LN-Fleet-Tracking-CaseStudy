import { memo, useMemo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { MasterSlaveLayout } from '../layouts';
import { MasterPanel, SlavePanel } from '.';
import { useAppContext } from '../../context';

const AppContent = memo(() => {
  const { viewType } = useAppContext();

  const masterContent = useMemo(() => <MasterPanel />, []);

  const slaveContent = useMemo(() => <SlavePanel />, [viewType]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          color: '#1976d2',
          flexShrink: 0,
        }}
      >
        <Stack
          direction='row'
          spacing={1}
          sx={{
            mx: 2,
            my: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <LocalShippingIcon color='primary' />
          <Typography variant='h5'>React Fleet Tracking App</Typography>
        </Stack>
      </Box>
      <Box sx={{ flex: 1, px: 1, pb: 1, overflow: 'hidden' }}>
        <MasterSlaveLayout
          master={masterContent}
          slave={slaveContent}
          masterWidth={4}
          slaveWidth={8}
          spacing={2}
          enableResize={true}
        />
      </Box>
    </Box>
  );
});

AppContent.displayName = 'AppContent';

export default AppContent;
