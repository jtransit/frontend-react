import { useMapEvents } from 'react-leaflet';
import { useMapContext } from '@contexts/map-context';

export const MapEvents = () => {
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
      isContextMenu(e) && handleReset();
    },
    zoom: () => {
      handleReset();
    },
    dragstart: () => {
      handleReset();
    },
    contextmenu: (e) => {
      handleContextMenuOpen(e);
    },
  });

  return null;
};
