import { ReactNode } from 'react';
import L from 'leaflet';

import { Suggestions, defaultSuggestions } from '@app-types/map-service';
import { Location, LocationInfo, Route } from '@app-types/directions';

export interface MapContextProps {
  defaults: DefaultProps;
  directions: DirectionProps;
  contextMenu: ContextMenuProps;
}

interface DefaultProps {
  isLoading: boolean;
  action?: string;
  handleLoading: (v: boolean) => void;
  handleAction: (v?: string) => void;
}

interface DirectionProps {
  location: Location;
  search: {
    isLoading: boolean;
    list: Suggestions['features'];
  };
  selectedRoute: Record<string, unknown>;
  routeInfo: Record<string, unknown>[];
  routeIndex: number;
  handleChangeFrom: (v?: string, latLng?: number[]) => void;
  handleChangeTo: (v?: string, latLng?: number[]) => void;
  handleNext: () => void;
  handleBack: () => void;
  handleClear: () => void;
}

interface ContextMenuProps {
  isContextMenuOpen: boolean;
  containerPoint: L.Point;
  latLng: L.LatLng;
  handleContextMenuOpen: (e: L.LeafletMouseEvent) => void;
  handleContextMenuClose: () => void;
}

export const defaultMapContext: MapContextProps = {
  defaults: {
    isLoading: false,
    handleLoading: () => {},
    handleAction: (v?: string) => {},
  },
  directions: {
    location: {
      from: {
        address: '',
      },
      to: {
        address: '',
      },
    },
    search: {
      isLoading: false,
      list: defaultSuggestions.features,
    },
    selectedRoute: {},
    routeInfo: [{}],
    routeIndex: 0,
    handleChangeFrom: (v?: string, latLng?: number[]) => {},
    handleChangeTo: (v?: string, latLng?: number[]) => {},
    handleNext: () => () => {},
    handleBack: () => () => {},
    handleClear: () => () => {},
  },
  contextMenu: {
    isContextMenuOpen: false,
    containerPoint: new L.Point(0, 0),
    latLng: new L.LatLng(0, 0),
    handleContextMenuOpen: (e: L.LeafletMouseEvent) => {},
    handleContextMenuClose: () => {},
  },
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
    | Record<string, unknown>[]
    | LocationInfo
    | Route;
}

export interface MapState {
  isLoading: boolean;
  action?: string;
  isContextMenuOpen: boolean;
  containerPoint: L.Point;
  eventHandler?: L.LeafletMouseEvent;
  latLng: L.LatLng;
  from: LocationInfo;
  to: LocationInfo;
  route: Route;
}

export const defaultMapState: MapState = {
  isLoading: false,
  isContextMenuOpen: false,
  containerPoint: defaultMapContext.contextMenu.containerPoint,
  latLng: defaultMapContext.contextMenu.latLng,
  route: {
    index: 0,
    isLoading: false,
    list: [],
    info: [],
  },
  from: {
    address: '',
  },
  to: {
    address: '',
  },
};
