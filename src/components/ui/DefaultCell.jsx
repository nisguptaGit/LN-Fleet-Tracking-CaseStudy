import { memo } from 'react';
import { Box } from '@mui/material';
const DefaultCell = memo(({ column, vehicle }) => {
  return column.isTruncated ? (
    <Box
      sx={{
        maxWidth: 200,
        noWrap: true,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {vehicle[column.id]}
    </Box>
  ) : (
    vehicle[column.id]
  );
});

DefaultCell.displayName = 'DefaultCell';

export default DefaultCell;
