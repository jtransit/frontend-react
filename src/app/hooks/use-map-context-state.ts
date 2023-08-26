import { useState, useEffect } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';

import { MapContextProps, defaultMapContext } from '@app-types/map-context';
import useApiClient from '@api/api-client';

const useMapContextState: () => MapContextProps = () => {
  const { getRoute } = useApiClient();

  const [isLoading, setIsLoading] = useState(defaultMapContext.isLoading);

  const [isContextMenuOpen, setIsContextMenuOpen] = useState(
    defaultMapContext.isContextMenuOpen
  );

  const [containerPoint, setContainerPoint] = useState<L.Point>(
    defaultMapContext.containerPoint
  );

  const [latLng, setLatLng] = useState<L.LatLng>(defaultMapContext.latLng);
  const [from, setFrom] = useState<L.LatLng | undefined>();
  const [to, setTo] = useState<L.LatLng | undefined>();

  const [action, setAction] = useState<string>();

  const handleLoading = (v: boolean) => {
    setIsLoading(v);
  };

  const handleAction = (v?: string) => {
    setAction(v);
  };

  const handleContextMenuOpen = (e: L.LeafletMouseEvent) => {
    setIsContextMenuOpen(true);
    handleContainerPoint(e.containerPoint);
    handleLatLng(e.latlng);
  };

  const handleContextMenuClose = () => {
    setIsContextMenuOpen(false);
  };

  const handleContainerPoint = (v: L.Point) => {
    setContainerPoint(v);
  };

  const handleLatLng = (v: L.LatLng) => {
    setLatLng(v);
  };

  const handleAddFrom = () => {
    setFrom(latLng);
    handleContextMenuClose();
  };

  const handleAddTo = () => {
    setTo(latLng);
    handleContextMenuClose();
  };

  useEffect(() => {
    const request = async () => {
      if (from !== undefined && to !== undefined) {
        const response = await getRoute(
          `${from.lat},${from.lng}`,
          `${to.lat},${to.lng}`,
          '0',
          '800'
        );
      }
    };

    request();
  }, [from, to]);

  return {
    isLoading,
    isContextMenuOpen,
    action,
    containerPoint,
    latLng,
    handleLoading,
    handleAction,
    handleContextMenuOpen,
    handleContextMenuClose,
    handleAddFrom,
    handleAddTo,
  };
};

export default useMapContextState;
