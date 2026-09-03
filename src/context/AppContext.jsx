import {
  createContext,
  useContext,
  useMemo,
  useState,
  useCallback,
  useEffect,
} from 'react';
import { VEHICLE_STATUS, VIEW_TYPE } from '../utils/Constant';
const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [viewType, setViewType] = useState(VIEW_TYPE.LIST);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [vehiclesList, setVehiclesList] = useState([]);
  const [limit, setLimit] = useState(10);
  const [filterStatus, setFilterStatus] = useState('');
  const [countByStatus, setCountByStatus] = useState({
    [VEHICLE_STATUS.ALL.key]: 0,
    [VEHICLE_STATUS.DELIVERED.key]: 0,
    [VEHICLE_STATUS.INACTIVE.key]: 0,
    [VEHICLE_STATUS.EN_ROUTE.key]: 0,
  });

  useEffect(() => {
    const counts = {
      [VEHICLE_STATUS.ALL.key]: vehiclesList.length,
      [VEHICLE_STATUS.DELIVERED.key]: 0,
      [VEHICLE_STATUS.INACTIVE.key]: 0,
      [VEHICLE_STATUS.EN_ROUTE.key]: 0,
    };

    vehiclesList.forEach((vehicle) => {
      if (counts[vehicle.status] !== undefined) {
        counts[vehicle.status] += 1;
      }
    });

    setCountByStatus(counts);
  }, [vehiclesList, setCountByStatus]);
  const handleViewChange = useCallback((view) => {
    setViewType(view);
  }, []);

  const handleSelectVehicle = useCallback((item) => {
    setSelectedVehicle(item);
  }, []);

  const filteredVehicleList = useMemo(() => {
    return filterStatus
      ? vehiclesList.filter((l) => l.status === filterStatus)
      : vehiclesList;
  }, [filterStatus, vehiclesList]);
  const value = {
    viewType,
    selectedVehicle,
    vehiclesList: filteredVehicleList,
    setVehiclesList,
    filterStatus,
    setFilterStatus,
    limit,
    setLimit,
    countByStatus,
    handleViewChange,
    handleSelectVehicle,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};
