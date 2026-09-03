import { memo } from 'react';
import { Box } from '@mui/material';
const DateTimeCell = memo(({ column, vehicle }) => {
  return (
    <Box>
      {vehicle[column.id]
        ? new Date(vehicle[column.id]).toLocaleString([], {})
        : '-'}
    </Box>
  );
});

DateTimeCell.displayName = 'DateTimeCell';

export default DateTimeCell;
