import { MapAction, MapState } from '@app-types/map-context';
import { LocationInfo } from '@app-types/directions';
import { actions } from './actions';

export const mapReducer = (state: MapState, action: MapAction) => {
  let newState: MapState;

  switch (action.type) {
    case actions.handleLoading: {
      newState = {
        ...state,
        isLoading: action.value as boolean,
      };
      break;
    }
    case actions.handleAction: {
      newState = {
        ...state,
        action: action.value as string | undefined,
      };
      break;
    }
    case actions.handleContextMenuOpen: {
      const e = action.value as L.LeafletMouseEvent;
      newState = {
        ...state,
        isContextMenuOpen: true,
        eventHandler: e,
        containerPoint: e.containerPoint,
        latLng: e.latlng,
      };
      break;
    }
    case actions.handleContextMenuClose: {
      newState = {
        ...state,
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleChangeFrom: {
      const location = action.value as LocationInfo;
      newState = {
        ...state,
        from: {
          ...state.from,
          address: location.address,
          latLng: location?.latLng ?? state.latLng,
        },
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleChangeTo: {
      const location = action.value as LocationInfo;
      newState = {
        ...state,
        to: {
          ...state.to,
          address: location.address,
          latLng: location?.latLng ?? state.latLng,
        },
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleNext: {
      const selected = state.selectedRouteIndex;
      newState = {
        ...state,
        selectedRouteIndex:
          state.routes[selected + 1] === undefined ? selected : selected + 1,
      };
      break;
    }
    case actions.handleBack: {
      const selected = state.selectedRouteIndex;
      newState = {
        ...state,
        selectedRouteIndex:
          state.routes[selected - 1] === undefined ? selected : selected - 1,
      };
      break;
    }
    case actions.handleClear: {
      newState = {
        ...state,
        from: {
          ...state.from,
          address: '',
          latLng: undefined,
        },
        to: {
          ...state.to,
          address: '',
          latLng: undefined,
        },
        routes: [],
        selectedRouteIndex: 0,
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleSetRoutes: {
      newState = {
        ...state,
        routes: action.value as Record<string, unknown>[],
        selectedRouteIndex: 0,
        isLoading: false,
      };
      break;
    }
    default: {
      throw new Error('Invalid Action');
    }
  }

  return newState;
};
