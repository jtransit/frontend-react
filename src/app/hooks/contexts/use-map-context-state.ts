import { useEffect, useMemo, useReducer } from 'react';
import L from 'leaflet';
import { debounce } from 'lodash';

import useMapService from '@hooks/services/map-service';
import { MapContextProps, defaultMapState } from '@app-types/map-context';
import useRouteService from '@hooks/services/route-service';
import { LocationInfo, Route } from '@app-types/directions';
import { mapReducer } from './map-reducer';
import { actions } from './actions';

const useMapContextState: () => MapContextProps = () => {
  const { getRoute } = useRouteService();

  const [state, dispatch] = useReducer(mapReducer, defaultMapState);

  const {
    isLoading: isLoadingSearch,
    searchSuggestions,
    search,
  } = useMapService();

  const route = useMemo(() => {
    return {
      index: state.route.index,
      selected: state.route.list[state.route.index],
      info: state.route.info,
    };
  }, [state.route, state.route]);

  const debouncedSearch = useMemo(
    () => debounce((v: string) => search(v), 1000),
    []
  );

  const handleLoading = (v: boolean) => {
    dispatch({ type: actions.handleLoading, value: v });
  };

  const handleAction = (v?: string) => {
    dispatch({ type: actions.handleAction, value: v });
  };

  const handleContextMenuOpen = (e: L.LeafletMouseEvent) => {
    dispatch({ type: actions.handleContextMenuOpen, value: e });
  };

  const handleContextMenuClose = () => {
    dispatch({ type: actions.handleContextMenuClose });
  };

  const handleChangeDirection = (
    action: string,
    address?: string,
    latLng?: number[]
  ) => {
    if (address !== undefined) {
      dispatch({
        type: action,
        value: {
          address: address,
          latLng: latLng ? new L.LatLng(latLng[1], latLng[0]) : undefined,
        } as LocationInfo,
      });
      debouncedSearch(address);
    } else {
      handleContextMenuClose();
      search(`${state.latLng.lng},${state.latLng.lat}`).then((v) => {
        dispatch({
          type: action,
          value: {
            address: v?.data?.features[0]?.place_name ?? '',
          } as LocationInfo,
        });
      });
    }
  };

  const handleChangeFrom = (address?: string, latLng?: number[]) => {
    handleChangeDirection(actions.handleChangeFrom, address, latLng);
  };

  const handleChangeTo = (address?: string, latLng?: number[]) => {
    handleChangeDirection(actions.handleChangeTo, address, latLng);
  };

  const handleNext = () => {
    dispatch({ type: actions.handleNext });
  };

  const handleBack = () => {
    dispatch({ type: actions.handleBack });
  };

  const handleClear = () => {
    dispatch({ type: actions.handleClear });
  };

  // TODO:WIP API routing
  useEffect(() => {
    const request = async () => {
      if (state.from?.latLng !== undefined && state.to?.latLng !== undefined) {
        handleLoading(true);
        const response = await getRoute(
          `${state.from.latLng?.lat},${state.from.latLng?.lng}`,
          `${state.to.latLng?.lat},${state.to.latLng?.lng}`,
          '0',
          '800'
        );

        const info = response.data.plan.itineraries.map((route: any) => {
          return route.legs.map((leg: any) => {
            return {
              points: leg.legGeometry.points,
              from: leg.from.name,
              name: leg.route,
            };
          });
        });

        // dispatch({
        //   type: actions.handleSetRoutes,
        //   value: info
        // });
      }
    };

    request();
  }, [state.from?.latLng, state.to?.latLng]);

  return {
    defaults: {
      isLoading: state.isLoading,
      action: state.action,
      handleLoading,
      handleAction,
    },
    directions: {
      location: {
        from: state.from,
        to: state.to,
      },
      search: {
        isLoading: isLoadingSearch,
        list: searchSuggestions.features,
      },
      selectedRoute: route.selected,
      routeInfo: route.info,
      routeIndex: route.index,
      handleChangeFrom,
      handleChangeTo,
      handleNext,
      handleBack,
      handleClear,
    },
    contextMenu: {
      isContextMenuOpen: state.isContextMenuOpen,
      containerPoint: state.containerPoint,
      latLng: state.latLng,
      handleContextMenuOpen,
      handleContextMenuClose,
    },
  };
};

export default useMapContextState;
