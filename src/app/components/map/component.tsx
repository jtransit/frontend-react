'useClient';
import React from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { MapContextProvider } from '@contexts/map-context';
import { MapEvents } from '@components/map/events';
import { ContextMenu } from '@components/menu/context-menu';
import Line from '@components/map/line';
import NavigationMenu from '@components/menu/navigation-menu';

const MapComponent = () => {
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
        <MapEvents />
      </MapContextProvider>
    </MapContainer>
  );
};

export default MapComponent;
