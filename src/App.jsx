import AppContent from './components/ui/AppContent';
import { AppProvider } from './context';

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
