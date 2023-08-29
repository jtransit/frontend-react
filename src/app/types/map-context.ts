import { ReactNode } from 'react';
import L from 'leaflet';

export interface MapContextProps {
  isLoading: boolean;
  isContextMenuOpen: boolean;
  action?: string;
  containerPoint: L.Point;
  latLng: L.LatLng;
  from?: L.LatLng;
  to?: L.LatLng;
  selectedRoute: Record<string, unknown>;
  handleLoading: (v: boolean) => void;
  handleAction: (v?: string) => void;
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => void;
  handleContextMenuClose: () => void;
  handleAddFrom: () => void;
  handleAddTo: () => void;
  handleNext: () => void;
  handleBack: () => void;
  handleClear: () => void;
}

export const defaultMapContext: MapContextProps = {
  isLoading: false,
  isContextMenuOpen: false,
  containerPoint: new L.Point(0, 0),
  latLng: new L.LatLng(0, 0),
  selectedRoute: {},
  handleLoading: () => {},
  handleAction: (v?: string) => {},
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => {},
  handleContextMenuClose: () => {},
  handleAddFrom: () => {},
  handleAddTo: () => {},
  handleNext: () => {},
  handleBack: () => {},
  handleClear: () => {},
};

export interface MapContextProviderProps {
  children: ReactNode;
}
