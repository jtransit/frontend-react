import { AppContextProvider } from '@contexts/app-context';
import MapWrapper from '@components/map/wrapper';
import Drawer from '@components/menu/drawer';

const Home = () => {
  return (
    <AppContextProvider>
      <MapWrapper />
      <Drawer />
    </AppContextProvider>
  );
};

export default Home;
