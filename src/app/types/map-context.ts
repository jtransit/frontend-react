import { ReactNode } from 'react';
import L from 'leaflet';

export interface MapContextProps {
  isLoading: boolean;
  isContextMenuOpen: boolean;
  action?: string;
  containerPoint: L.Point;
  latLng: L.LatLng;
  from?: Location;
  to?: Location;
  selectedRoute: Record<string, unknown>;
  handleLoading: (v: boolean) => void;
  handleAction: (v?: string) => void;
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => void;
  handleContextMenuClose: () => void;
  handleChangeFrom: (e?: any) => void;
  handleChangeTo: (e?: any) => void;
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
  handleChangeFrom: (e?: any) => {},
  handleChangeTo: (e?: any) => {},
  handleNext: () => {},
  handleBack: () => {},
  handleClear: () => {},
};

export interface MapContextProviderProps {
  children: ReactNode;
}

export interface MapAction {
  type: string;
  value?:
    | string
    | boolean
    | L.LeafletMouseEvent
    | L.LatLng
    | Record<string, unknown>[];
}

interface Location {
  address?: string;
  latLng?: L.LatLng;
}

export interface MapState {
  isLoading: boolean;
  action?: string;
  isContextMenuOpen: boolean;
  containerPoint: L.Point;
  eventHandler?: L.LeafletMouseEvent;
  latLng: L.LatLng;
  from?: Location;
  to?: Location;
  routes: Array<Record<string, unknown>>;
  selectedRouteIndex: number;
}

export const defaultMapState: MapState = {
  isLoading: false,
  isContextMenuOpen: false,
  containerPoint: defaultMapContext.containerPoint,
  latLng: defaultMapContext.latLng,
  routes: [],
  selectedRouteIndex: 0,
};
