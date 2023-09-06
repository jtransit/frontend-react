import { MapAction, MapState } from '@app-types/map-context';
import { actions } from './actions';

export const mapReducer = (state: MapState, action: MapAction) => {
  let newState;

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
    case actions.handleSetFrom: {
      newState = {
        ...state,
        from: action.value as L.LatLng,
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleSetTo: {
      newState = {
        ...state,
        to: action.value as L.LatLng,
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
        from: undefined,
        to: undefined,
        routes: [],
        selectedRouteIndex: 0,
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleSetRoutes: {
      newState = {
        ...state,
        routes: [],
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
