import { memo } from 'react';
import {
  DriverCell,
  StatusCell,
  FuelLavelCell,
  LocationCell,
  SpeedCell,
  DateTimeCell,
  DefaultCell,
} from '.';
import { BasicCard } from '../common';
import { Box, Typography, Grid } from '@mui/material';
import NearMeIcon from '@mui/icons-material/NearMe';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';

const VehiclesCard = memo(({ vehicle, isSelectedVehicle, onVehicleSelect }) => {
  const sxObj = { display: 'flex', p: 1 };
  const sxIcon = { fontSize: '0.95rem', color: 'text.secondary' };
  if (!vehicle) return null;

  return (
    <Box
      onClick={() => onVehicleSelect?.(vehicle)}
      sx={{
        p: 1,
        bgcolor: isSelectedVehicle ? '#e3f2fd' : '#f5f5f5',
        borderRadius: 2,
        border: isSelectedVehicle ? '2px solid #1976d2' : '1px solid #ddd',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'all 0.2s ease',
        '&:hover': {
          borderColor: isSelectedVehicle ? '#0077ee' : '#b3b3b3',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.05)',
        },
      }}
    >
      <Grid spacing={1} sx={{ alignItems: 'stretch' }}>
        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard>
            <Box
              sx={{
                display: 'flex',
                background: 'primary',
                alignItems: 'center',
                gap: 0.5,
                mb: 0.5,
              }}
            >
              <LocalShippingIcon color='primary'></LocalShippingIcon>{' '}
              <Typography variant='h5' sx={{ px: 2 }}>
                {vehicle.vehicleNumber}
              </Typography>
              <StatusCell vehicle={vehicle} />
              {vehicle.speed ? (
                <>
                  <SpeedCell vehicle={vehicle}></SpeedCell>
                </>
              ) : null}
            </Box>
          </BasicCard>
        </Grid>

        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard
            icon={PersonIcon}
            title='Driver'
            // value={}
          >
            {vehicle.driverName} ( <PhoneIcon sx={sxIcon}></PhoneIcon>
            {vehicle.driverPhone})
          </BasicCard>
        </Grid>

        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard
            icon={LocationOnIcon}
            title='Destination'
            value={vehicle.destination}
          />
        </Grid>

        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard icon={NearMeIcon} title='Location'>
            <LocationCell vehicle={vehicle} />
          </BasicCard>
        </Grid>

        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard title='Fuel / Battery Level'>
            <FuelLavelCell vehicle={vehicle} />
          </BasicCard>
        </Grid>
        {vehicle.estimatedArrival ? (
          <Grid item xs={12} sm={6} sx={sxObj}>
            <BasicCard icon={AccessTimeIcon} title='ETA'>
              <DateTimeCell
                column={{ id: 'estimatedArrival' }}
                vehicle={vehicle}
              />
            </BasicCard>
          </Grid>
        ) : null}
        <Grid item xs={12} sm={6} sx={sxObj}>
          <BasicCard icon={AccessTimeIcon} title='Last Updated At'>
            <DateTimeCell column={{ id: 'lastUpdated' }} vehicle={vehicle} />
          </BasicCard>
        </Grid>
      </Grid>
    </Box>
  );
});

VehiclesCard.displayName = 'VehiclesCard';

export default VehiclesCard;
