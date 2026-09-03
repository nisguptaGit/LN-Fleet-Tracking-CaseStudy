import { useEffect, useCallback, useMemo, memo, useState } from 'react';
import {
  SlavePanelUI,
  VehiclesTable,
  VehiclesCardList,
  VehiclesCard,
} from './';
import { DialogComponent } from '../common';
import { useDialog, useFetch } from '../../hooks';
import { useAppContext } from '../../context';
import { Box, CircularProgress, Typography } from '@mui/material';
import {
  API_ENDPOINTS,
  VIEW_TYPE,
  MAPPED_VEHICLE_BY_STATUS,
} from '../../utils/Constant';

const SlavePanel = memo(() => {
  const {
    viewType,
    filterStatus,
    selectedVehicle,
    vehiclesList,
    handleViewChange,
  } = useAppContext();

  const [dialogVehicle, setDialogVehicle] = useState(null);
  const [fetchUrl, setFetchUrl] = useState('');
  const dialog = useDialog({ message: 'Dialog opened!' });

  const {
    data: fetchedData,
    loading: isDialogLoading,
    fetch: executeFetch,
  } = useFetch(fetchUrl, {}, false);

  useEffect(() => {
    if (fetchedData?.success && fetchedData?.data) {
      setDialogVehicle({
        ...fetchedData.data,
        lastUpdated: fetchedData.timestamp,
      });
    }
  }, [fetchedData]);

  const fetchVehicleData = useCallback(
    (vehicleData) => {
      if (!vehicleData?.id) return;

      const targetUrl = API_ENDPOINTS.getVehicleById(vehicleData.id);
      setFetchUrl(targetUrl);
      executeFetch(targetUrl);
    },
    [executeFetch],
  );

  const handleOpenDialogClick = useCallback(
    (data) => {
      setDialogVehicle(data);
      dialog.open({
        title: 'Vehicle Info',
        data: data,
        onSave: () => fetchVehicleData(data),
        onCancel: () => {},
      });
    },
    [dialog, fetchVehicleData],
  );

  const dialogContent = useMemo(() => {
    if (isDialogLoading) {
      return (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            py: 4,
            gap: 2,
          }}
        >
          <CircularProgress size={40} />
          <Typography variant='body2' color='text.secondary'>
            Loading...
          </Typography>
        </Box>
      );
    }
    return dialogVehicle ? <VehiclesCard vehicle={dialogVehicle} /> : null;
  }, [isDialogLoading, dialogVehicle]);

  return (
    <>
      <SlavePanelUI
        title={`Vehicles (${vehiclesList.length}) ${filterStatus ? `- ${MAPPED_VEHICLE_BY_STATUS[filterStatus].text}` : ''}`}
        viewType={viewType}
        onViewChange={handleViewChange}
      >
        {viewType === VIEW_TYPE.LIST ? (
          <VehiclesTable
            vehicles={vehiclesList}
            onVehicleClick={handleOpenDialogClick}
            tableHeight={'calc( 100vh - 300px )'}
            rowHeight={65}
            key={'table'}
          />
        ) : (
          <VehiclesCardList
            vehiclesList={vehiclesList}
            selectedVehicle={selectedVehicle}
            onVehicleSelect={handleOpenDialogClick}
          />
        )}
      </SlavePanelUI>

      <DialogComponent
        isOpen={dialog.isOpen}
        title={dialog.title}
        content={dialogContent}
        onSave={dialog.handleSave}
        onCancel={dialog.handleCancel}
        hideSave={false}
        saveButtonText={isDialogLoading ? 'Fetching...' : 'Fetch'}
        cancelButtonText='Close'
        disabled={isDialogLoading}
      />
    </>
  );
});

SlavePanel.displayName = 'SlavePanel';
export default SlavePanel;
