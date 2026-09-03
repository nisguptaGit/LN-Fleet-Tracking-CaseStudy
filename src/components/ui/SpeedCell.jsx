import { memo } from 'react';
import { Box } from '@mui/material';
import { Badge } from '../common';
import SpeedIcon from '@mui/icons-material/Speed';

const SpeedCell = memo(({ vehicle, icon }) => {
  const sxIcon = { fontSize: '0.95rem', color: 'text.secondary' };

  return (
    <Box title={'Speed'}>
      <Badge
        icon={<SpeedIcon sx={sxIcon}></SpeedIcon>}
        label={`${vehicle.speed} mph`}
      >
      </Badge>
    </Box>
  );
});

SpeedCell.displayName = 'SpeedCell';

export default SpeedCell;
