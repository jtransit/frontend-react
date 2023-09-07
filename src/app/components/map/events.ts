import { useMapEvents } from 'react-leaflet';
import { useMapContext } from '@contexts/map-context';
import { useAppContext } from '@contexts/app-context';

export const MapEvents = () => {
  const { handleShowDrawer, handleShowNavigationMenu } = useAppContext();

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
      handleShowNavigationMenu(false);
      handleShowDrawer(false);
      handleReset();
    },
    dragend: () => {
      handleShowNavigationMenu(true);
    },
    contextmenu: (e) => {
      handleShowDrawer(false);
      handleContextMenuOpen(e);
    },
  });

  return null;
};
