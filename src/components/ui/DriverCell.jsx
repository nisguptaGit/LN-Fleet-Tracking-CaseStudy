import { memo } from 'react';
import { Box } from '@mui/material';
const DriverCell = memo(({ vehicle }) => {
  return (
    <Box>
      <Box
        title={`${vehicle.driverName}(${vehicle.driverPhone})`}
        sx={{ fontWeight: 'medium' }}
      >
        {vehicle.driverName}
      </Box>
    </Box>
  );
});

DriverCell.displayName = 'DriverCell';

export default DriverCell;
