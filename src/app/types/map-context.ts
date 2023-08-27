import { ReactNode } from 'react';
import L from 'leaflet';

export interface MapContextProps {
  isLoading: boolean;
  isContextMenuOpen: boolean;
  action?: string;
  containerPoint: L.Point;
  latLng: L.LatLng;
  routes: Array<Record<string, unknown>>;
  handleLoading: (v: boolean) => void;
  handleAction: (v?: string) => void;
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => void;
  handleContextMenuClose: () => void;
  handleAddFrom: () => void;
  handleAddTo: () => void;
}

export const defaultMapContext: MapContextProps = {
  isLoading: false,
  isContextMenuOpen: false,
  containerPoint: new L.Point(0, 0),
  latLng: new L.LatLng(0, 0),
  routes: [],
  handleLoading: () => {},
  handleAction: (v?: string) => {},
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => {},
  handleContextMenuClose: () => {},
  handleAddFrom: () => {},
  handleAddTo: () => {},
};

export interface MapContextProviderProps {
  children: ReactNode;
}
