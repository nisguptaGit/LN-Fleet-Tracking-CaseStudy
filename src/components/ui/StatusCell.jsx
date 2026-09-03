import { memo } from 'react';
import { Box } from '@mui/material';
import { Badge } from '../common';
import { MAPPED_VEHICLE_BY_STATUS } from '../../utils/Constant';
const StatusCell = memo(({ vehicle }) => {
  return (
    <Box>
      <Badge
        label={MAPPED_VEHICLE_BY_STATUS[vehicle.status].text}
        color={MAPPED_VEHICLE_BY_STATUS[vehicle.status].color}
        variant='outlined'
        sx={{ fontWeight: 'bold' }}
      />
    </Box>
  );
});

StatusCell.displayName = 'StatusCell';

export default StatusCell;
