'useClient';
import React, { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { decode } from '@googlemaps/polyline-codec';

import useRouteService from '@hooks/services/route-service';
import { MapContextProvider } from '@contexts/map-context';
import { MapEvents } from '@components/map/events';
import { ContextMenu } from '@components/menu/context-menu';
import Line from '@components/map/line';
import NavigationMenu from '@components/menu/navigation-menu';

const MapComponent = () => {
  const { getRoute } = useRouteService();

  const [line, setLine] = useState<LatLngExpression[]>([]);

  // TODO: this is a prototype for API request
  const request = async () => {
    const response = await getRoute(
      '10.309712,123.893926',
      '10.328736,123.910511',
      '0',
      '800'
    );
    const points = response.data.plan.itineraries[0].legs[1].legGeometry.points;
    setLine(decode(points));
  };

  useEffect(() => {
    request();
  }, []);

  return (
    <MapContainer
      center={[10.323267, 123.905601]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
      style={{ height: '100vh', width: '100wh' }}
    >
      <MapContextProvider>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        <ContextMenu />
        <NavigationMenu />
        <Line />
        <Polyline pathOptions={{ color: 'blue', weight: 5 }} positions={line} />
        <MapEvents />
      </MapContextProvider>
    </MapContainer>
  );
};

export default MapComponent;
