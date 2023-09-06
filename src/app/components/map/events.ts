import { useMapEvents } from 'react-leaflet';
import { useMapContext } from '@contexts/map-context';
import { useAppContext } from '@contexts/app-context';

export const MapEvents = () => {
  const { handleShowDrawer } = useAppContext();

  const { handleAction, handleContextMenuOpen, handleContextMenuClose } =
    useMapContext();

  const isContextMenu = (e: L.LeafletMouseEvent) => {
    return (e.originalEvent.target as HTMLInputElement).id === '';
  };

  const handleReset = () => {
    handleContextMenuClose();
    handleAction();
  };

  useMapEvents({
    click: (e) => {
      handleShowDrawer(false);
      isContextMenu(e) && handleReset();
    },
    zoom: () => {
      handleShowDrawer(false);
      handleReset();
    },
    dragstart: () => {
      handleShowDrawer(false);
      handleReset();
    },
    contextmenu: (e) => {
      handleShowDrawer(false);
      handleContextMenuOpen(e);
    },
  });

  return null;
};
