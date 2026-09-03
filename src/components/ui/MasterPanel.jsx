import { useEffect, useCallback, useMemo, memo, useState } from 'react';
import { MasterPanelUI } from '.';
import { useToggle, useAutoFetch, useFetch } from '../../hooks';
import { useAppContext } from '../../context';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import TimelineIcon from '@mui/icons-material/Timeline';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import {
  Box,
  Button,
  Stack,
  Chip,
  Typography,
  Divider,
  ToggleButton,
  ToggleButtonGroup,
  Card,
} from '@mui/material';
import {
  WEB_SOCKET_URL,
  API_ENDPOINTS,
  VEHICLE_STATUS,
  STATS_KEYS,
} from '../../utils/Constant';

const MasterPanel = memo(() => {
  const { isActive: isAutoFetch, toggle: toggleAutoFetch } = useToggle(true);
  const {
    setVehiclesList,
    filterStatus,
    setFilterStatus,
    limit,
    setLimit,
    countByStatus,
  } = useAppContext();

  const wsUrl = `${WEB_SOCKET_URL}`;
  const vehiclesApiUrl = useMemo(
    () => API_ENDPOINTS.getVehicles(filterStatus, limit),
    [limit, filterStatus],
  );
  const statsApiUrl = useMemo(() => API_ENDPOINTS.getStatistics(), []);
  const { data: statsData, fetch: executeFetchStats } = useFetch(
    statsApiUrl,
    {},
    false,
  );

  const {
    data,
    loading: autoFetchLoading,
    refresh,
    status,
    mode,
  } = useAutoFetch(wsUrl, vehiclesApiUrl, isAutoFetch);
  const refreshStats = useCallback(() => {
    executeFetchStats();
  }, [executeFetchStats]);
  useEffect(() => {
    if (data) {
      setVehiclesList(data.data);
    }
    refreshStats();
  }, [data, setVehiclesList]);
  const dividerSx = useMemo(
    () => ({ borderColor: '#444444', borderWidth: '1px', mb: 1 }),
    [],
  );

  return (
    <>
      <MasterPanelUI title={``}>
        <Stack
          direction='row'
          spacing={1}
          sx={{ mb: 2, justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Button
            variant={'contained'}
            size='small'
            onClick={toggleAutoFetch}
            sx={{ textTransform: 'none' }}
          >
            {isAutoFetch ? 'LIVE UPDATE ACTIVE' : 'MANUAL LOAD'}
          </Button>

          <Chip
            label={isAutoFetch ? `WEB-SOCKET MODE - ${status}` : 'API MODE'}
            size='small'
            color={
              isAutoFetch
                ? status === 'OPEN'
                  ? 'success'
                  : 'default'
                : 'primary'
            }
            variant='outlined'
          />
        </Stack>
        <Divider sx={dividerSx} />
        {!isAutoFetch && (
          <>
            <Stack
              direction='row'
              spacing={1}
              sx={{
                mb: 2,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  border: '1px solid #76c3ea',
                  padding: '5px',
                }}
              >
                <Button
                  variant={'outlined'}
                  size='small'
                  onClick={() => setLimit((l) => Math.max(0, l - 1))}
                >
                  <RemoveIcon />
                </Button>
                <Typography sx={{ mx: 2 }}> Limit = {limit} </Typography>
                <Button
                  variant={'outlined'}
                  size='small'
                  onClick={() => setLimit((l) => l + 1)}
                >
                  <AddIcon />
                </Button>
              </Box>
              <Button
                variant='outlined'
                size='small'
                onClick={refresh}
                disabled={autoFetchLoading}
                sx={{ textTransform: 'none' }}
              >
                {autoFetchLoading ? 'Refreshing...' : 'Refresh'}
              </Button>
            </Stack>
            <Divider sx={dividerSx} />
          </>
        )}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Typography variant='h5'>
            <TimelineIcon sx={{ m: 1 }} /> Filter by Status
          </Typography>
        </Box>
        <ToggleButtonGroup
          color='primary'
          value={filterStatus}
          exclusive
          onChange={(event, value) => {
            setFilterStatus(value);
          }}
          aria-label='StatusFilter'
        >
          <ToggleButton value={VEHICLE_STATUS.ALL.apiValue}>
            {VEHICLE_STATUS.ALL.text} ({countByStatus[VEHICLE_STATUS.ALL.key]})
          </ToggleButton>
          <ToggleButton value={VEHICLE_STATUS.EN_ROUTE.apiValue}>
            {VEHICLE_STATUS.EN_ROUTE.text} (
            {countByStatus[VEHICLE_STATUS.EN_ROUTE.key]})
          </ToggleButton>
          <ToggleButton value={VEHICLE_STATUS.INACTIVE.apiValue}>
            {VEHICLE_STATUS.INACTIVE.text} (
            {countByStatus[VEHICLE_STATUS.INACTIVE.key]})
          </ToggleButton>
          <ToggleButton value={VEHICLE_STATUS.DELIVERED.apiValue}>
            {VEHICLE_STATUS.DELIVERED.text} (
            {countByStatus[VEHICLE_STATUS.DELIVERED.key]})
          </ToggleButton>
        </ToggleButtonGroup>
        <Divider sx={{ ...dividerSx, mt: 1 }} />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '5px',
          }}
        >
          <Typography variant='h5'>
            <AccessTimeIcon sx={{ m: 1 }} />
            Fleet Statistics (ALL)
          </Typography>
          <Button
            variant='outlined'
            size='small'
            sx={{ textTransform: 'none' }}
            onClick={refreshStats}
          >
            Refresh Stats
          </Button>
        </Box>
        <Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
            {STATS_KEYS.map((stats, i) => (
              <Card
                key={stats.key}
                variant='outlined'
                sx={{ p: 2, textAlign: 'center' }}
              >
                <Typography variant='h4'>
                  {statsData && statsData.data
                    ? stats.covert
                      ? stats.covert(statsData.data[stats.key])
                      : statsData.data[stats.key]
                    : 'NA'}
                </Typography>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: 0.5,
                  }}
                >
                  <Typography variant='caption'>{stats.text}</Typography>
                </Box>
              </Card>
            ))}
          </Box>

          {statsData?.data?.timestamp ? (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 0.5,
                mt: 1,
              }}
            >
              <Typography variant='caption'>
                Statistics data last update at :
                {new Date(statsData.data.timestamp).toLocaleString([], {})}
              </Typography>
            </Box>
          ) : null}
        </Box>
      </MasterPanelUI>
    </>
  );
});

MasterPanel.displayName = 'MasterPanel';
export default MasterPanel;
