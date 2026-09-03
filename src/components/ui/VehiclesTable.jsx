import { memo, useMemo, useCallback } from 'react';

import {
  Box,
  Table as MuiTable,
  TableCell,
  TableContainer,
  TableRow,
  TableHead,
  Paper,
} from '@mui/material';
import { VirtualList } from '../common';
import {
  DriverCell,
  StatusCell,
  FuelLavelCell,
  LocationCell,
  SpeedCell,
  DateTimeCell,
  DefaultCell,
} from '.';
import { VEHICLE_TABLE_COLUMNS_CONFIG } from '../../utils/Constant';

const VehiclesTable = memo(
  ({
    vehicles = [],
    columnsConfig = VEHICLE_TABLE_COLUMNS_CONFIG,
    onVehicleClick,
    rowHeight = 60,
    tableHeight = 400,
  }) => {
    // Dynamic cell content rendering factory based on column config
    const renderCellContent = useCallback((vehicle, column) => {
      switch (column.customRender) {
        case 'driver':
          return <DriverCell vehicle={vehicle}></DriverCell>;

        case 'status':
          return <StatusCell vehicle={vehicle}></StatusCell>;
        case 'progress':
          return <FuelLavelCell vehicle={vehicle}></FuelLavelCell>;
        case 'link':
          return <LocationCell vehicle={vehicle}></LocationCell>;
        case 'speed':
          return <SpeedCell vehicle={vehicle}></SpeedCell>;
        case 'datetime':
          return (
            <DateTimeCell column={column} vehicle={vehicle}></DateTimeCell>
          );

        default:
          return <DefaultCell column={column} vehicle={vehicle}></DefaultCell>;
      }
    }, []);

    const totalTableWidth = useMemo(() => {
      return columnsConfig.reduce((acc, col) => acc + (col.width || 150), 0);
    }, [columnsConfig]);

    const renderRowItem = useCallback(
      (vehicle, index) => {
        return (
          <TableRow
            component='div'
            hover
            sx={{
              display: 'flex',
              alignItems: 'center',
              width: '100%',
              height: '100%',
              borderBottom: '1px solid',
              borderColor: 'divider',
            }}
          >
            {columnsConfig.map((column) => {
              const isClickableId = column.isClickable;

              return (
                <TableCell
                  key={column.id}
                  component='div'
                  align={column.align || 'left'}
                  onClick={
                    isClickableId ? () => onVehicleClick?.(vehicle) : undefined
                  }
                  sx={{
                    width: column.width || 150,
                    flexGrow: column.width ? 0 : 1,
                    flexShrink: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent:
                      column.align === 'right'
                        ? 'flex-end'
                        : column.align === 'center'
                          ? 'center'
                          : 'flex-start',
                    padding: '8px',
                    borderBottom: 'none',
                    ...(isClickableId && {
                      fontWeight: 'bold',
                      color: 'primary.main',
                      cursor: 'pointer',
                      '&:hover': { textDecoration: 'underline' },
                    }),
                  }}
                >
                  {renderCellContent(vehicle, column)}
                </TableCell>
              );
            })}
          </TableRow>
        );
      },
      [columnsConfig, onVehicleClick, renderCellContent],
    );

    return (
      <TableContainer
        component={Paper}
        sx={{ boxShadow: 2, borderRadius: 2, overflow: 'auto' }}
      >
        <MuiTable
          component='div'
          sx={{ minWidth: Math.max(650, totalTableWidth) }}
          stickyHeader
          aria-label='virtualized fleet tracking data matrix'
        >
          <TableHead
            component='div'
            sx={{ display: 'block', position: 'sticky', top: 0, zIndex: 3 }}
          >
            <TableRow
              component='div'
              sx={{
                display: 'flex',
                width: '100%',
                backgroundColor: 'primary.light',
                color: 'primary.dark',
              }}
            >
              {columnsConfig.map((column) => (
                <TableCell
                  key={column.id}
                  component='div'
                  align={column.align || 'left'}
                  sx={{
                    fontWeight: 'bold',
                    backgroundColor: 'action.hover',
                    width: column.width || 150,
                    flexGrow: column.width ? 0 : 1,
                    flexShrink: 0,
                    padding: '8px',
                  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <Box sx={{ display: 'block', height: tableHeight }}>
            <VirtualList
              items={vehicles}
              itemSize={rowHeight}
              height={tableHeight}
              renderItem={renderRowItem}
            />
          </Box>
        </MuiTable>
      </TableContainer>
    );
  },
);

VehiclesTable.displayName = 'VehiclesTable';

export default VehiclesTable;
