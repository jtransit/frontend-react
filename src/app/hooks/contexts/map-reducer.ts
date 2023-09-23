import { MapAction, MapState } from '@app-types/map-context';
import { LocationInfo, Route } from '@app-types/directions';
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
      const selected = state.route.index;
      const list = state.route.list;
      newState = {
        ...state,
        route: {
          ...state.route,
          index: list[selected + 1] === undefined ? selected : selected + 1,
        },
      };
      break;
    }
    case actions.handleBack: {
      const selected = state.route.index;
      const list = state.route.list;
      newState = {
        ...state,
        route: {
          ...state.route,
          index: list[selected - 1] === undefined ? selected : selected - 1,
        },
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
        isContextMenuOpen: false,
      };
      break;
    }
    case actions.handleSetRoutes: {
      const route = action.value as Partial<Route>;
      newState = {
        ...state,
        route: {
          ...state.route,
          index: 0,
          isLoading: false,
          list: route.list ?? [],
          info: route.info ?? [],
        },
      };
      break;
    }
    default: {
      throw new Error('Invalid Action');
    }
  }

  return newState;
};
