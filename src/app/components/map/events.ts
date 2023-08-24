import { useMapEvents } from 'react-leaflet';
import { useMapContext } from '@contexts/map-context';

export const MapEvents = () => {
  const { handleContextMenuOpen } = useMapContext();

  useMapEvents({
    contextmenu: (e) => {
      handleContextMenuOpen(e);
    },
  });

  return null;
};
