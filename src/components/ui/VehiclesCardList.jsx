import { memo } from 'react';
import { Box, Typography } from '@mui/material';
import { VehiclesCard } from './';
const VehiclesCardList = memo(
  ({ vehiclesList, selectedVehicle, onVehicleSelect }) => {
    return (
      <Box
        sx={{
          display: 'grid',
          gap: 2,
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          width: '100%',
        }}
      >
        {vehiclesList.map((item) => {
          const isSelected = selectedVehicle?.id === item.id;
          return (
            <VehiclesCard
              key={item.id}
              onVehicleSelect={onVehicleSelect}
              isSelectedVehicle={isSelected}
              vehicle={item}
            ></VehiclesCard>
          );
        })}
      </Box>
    );
  },
);

VehiclesCardList.displayName = 'VehiclesCardList';

export default VehiclesCardList;
