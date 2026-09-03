import { memo } from 'react';
import { Box } from '@mui/material';
import { ProgressBar } from '../common';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import EvStationIcon from '@mui/icons-material/EvStation';

const FuelLavelCell = memo(({ vehicle }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <ProgressBar value={vehicle.fuelLevel}>
        <LocalGasStationIcon />
      </ProgressBar>
      <ProgressBar value={vehicle.batteryLevel}>
        <EvStationIcon />
      </ProgressBar>
    </Box>
  );
});

FuelLavelCell.displayName = 'FuelLavelCell';

export default FuelLavelCell;
