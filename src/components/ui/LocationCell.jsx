import { memo, useCallback } from 'react';
import { Box } from '@mui/material';
import { Link } from '../common';

const LocationCell = memo(({ vehicle }) => {
  const handleChildClick = useCallback((e) => {
    e.stopPropagation();
  }, []);
  return (
    <Box onClick={handleChildClick}>
      <Link
        location={`${vehicle?.currentLocation?.lat?.toFixed?.(4)}, ${vehicle?.currentLocation?.lng?.toFixed?.(4)}`}
        latitude={vehicle.currentLocation.lat}
        longitude={vehicle.currentLocation.lng}
      />
    </Box>
  );
});

LocationCell.displayName = 'LocationCell';

export default LocationCell;
