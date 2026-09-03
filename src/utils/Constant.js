export const WEB_SOCKET_URL = 'wss://case-study-26cf.onrender.com';
export const BASE_URL = 'https://case-study-26cf.onrender.com';

//https://case-study-26cf.onrender.com/api/vehicles?status=en_route&limit=10
//https://case-study-26cf.onrender.com/api/vehicles/status/en_route
//https://case-study-26cf.onrender.com/api/vehicles/ff254206-4e84-428e-a552-9dae5fc56def
//https://case-study-26cf.onrender.com/api/statistics

export const API_ENDPOINTS = {
  getVehicles: (status, limit) => {
    const params = Object.fromEntries(
      Object.entries({ status, limit }).filter(
        ([_, v]) => v != null && v !== '',
      ),
    );
    const queryParams = new URLSearchParams(params);
    const queryString = queryParams.toString();

    return `${BASE_URL}/api/vehicles${queryString ? `?${queryString}` : ''}`;
  },
  getVehicleById: (id) => `${BASE_URL}/api/vehicles/${id}`,
  getVehiclesByStatus: (status) => `${BASE_URL}/api/vehicles/status/${status}`,
  getStatistics: () => `${BASE_URL}/api/statistics`,
};

export const VEHICLE_STATUS = {
  ALL: { key: 'all', text: 'All', apiValue: '' },
  EN_ROUTE: {
    key: 'en_route',
    text: 'EN-ROUTE',
    apiValue: 'en_route',
    color: 'primary',
  },
  INACTIVE: { key: 'idle', text: 'IDLE', apiValue: 'idle', color: 'error' },
  DELIVERED: {
    key: 'delivered',
    text: 'DELIVERED',
    apiValue: 'delivered',
    color: 'success',
  },
};

export const MAPPED_VEHICLE_BY_STATUS = {
  en_route: VEHICLE_STATUS.EN_ROUTE,
  idle: VEHICLE_STATUS.INACTIVE,
  delivered: VEHICLE_STATUS.DELIVERED,
};

export const VIEW_TYPE = {
  LIST: 'list',
  CARD: 'card',
  TABLE: 'table',
  MAP: 'map',
};

export const WEB_SOCKET_STATUS = {
  CONNECTING: 'CONNECTING',
  OPEN: 'OPEN',
  CLOSED: 'CLOSED',
  ERROR: 'ERROR',
};

export const VEHICLE_TABLE_COLUMNS_CONFIG = [
  { id: 'vehicleNumber', label: 'Vehicle', width: 100, isClickable: true },
  { id: 'driverName', label: 'Driver', width: 180, customRender: 'driver' },
  { id: 'status', label: 'Status', width: 130, customRender: 'status' },
  { id: 'speed', label: 'Speed', width: 100, customRender: 'speed' },
  { id: 'destination', label: 'Destination', width: 200, isTruncated: true },
  {
    id: 'estimatedArrival',
    label: 'ETA',
    width: 180,
    customRender: 'datetime',
  },
  {
    id: 'fuel_battary',
    label: 'Fuel/Battery level',
    width: 150,
    customRender: 'progress',
  },
  {
    id: 'lastUpdated',
    label: 'Last Update',
    width: 180,
    customRender: 'datetime',
  },
  { id: 'location', label: 'Location', width: 180, customRender: 'link' },
];

export const STATS_KEYS = [
  { key: 'total', text: 'TOTAL FLEET' },
  { key: 'average_speed', text: 'AVG SPEED' },
  { key: 'en_route', text: 'MOVING' },
  { key: 'idle', text: 'IDLE' },
  { key: 'delivered', text: 'DELIVERED' },
  // { key: 'timestamp', text: 'LAST UPDATE', covert: (data) => new Date(data).toLocaleString([], {})  },
];
