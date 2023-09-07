import { useEffect, useMemo, useReducer } from 'react';
import L from 'leaflet';

import { MapContextProps, defaultMapState } from '@app-types/map-context';
import { mapReducer } from './map-reducer';
import useRouteService from '@hooks/services/route-service';
import { actions } from './actions';

const useMapContextState: () => MapContextProps = () => {
  const { getRoute } = useRouteService();

  const [state, dispatch] = useReducer(mapReducer, defaultMapState);

  const selectedRoute = useMemo(
    () => state.routes[state.selectedRouteIndex],
    [state.routes, state.selectedRouteIndex]
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

  const handleSetFrom = () => {
    dispatch({ type: actions.handleSetFrom, value: state.latLng });
  };

  const handleSetTo = () => {
    dispatch({ type: actions.handleSetTo, value: state.latLng });
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
      if (state.from !== undefined && state.to !== undefined) {
        handleLoading(true);
        const response = await getRoute(
          `${state.from.lat},${state.from.lng}`,
          `${state.to.lat},${state.to.lng}`,
          '0',
          '800'
        );

        const routes: Array<Record<string, unknown>> = [];
        response.data.plan.itineraries.forEach((route: any) => {
          const data: string[] = [];
          route.legs.forEach((leg: any) => {
            data.push(leg.legGeometry.points);
          });
          routes.push({
            points: data,
          });
        });

        dispatch({ type: actions.handleSetRoutes });
      }
    };

    request();
  }, [state.from, state.to]);

  return {
    isLoading: state.isLoading,
    isContextMenuOpen: state.isContextMenuOpen,
    action: state.action,
    containerPoint: state.containerPoint,
    latLng: state.latLng,
    from: state.from,
    to: state.to,
    selectedRoute,
    handleLoading,
    handleAction,
    handleContextMenuOpen,
    handleContextMenuClose,
    handleSetFrom,
    handleSetTo,
    handleNext,
    handleBack,
    handleClear,
  };
};

export default useMapContextState;
