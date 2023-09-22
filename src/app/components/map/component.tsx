'useClient';
import React from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import { MapContextProvider } from '@contexts/map-context';
import { MapEvents } from '@components/map/events';
import { ContextMenu } from '@components/menu/context-menu';
import Line from '@components/map/line';
import NavigationMenu from '@components/menu/navigation-menu';
import Markers from './markers';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconAnchor: [15, 40],
  popupAnchor: [0, -51],
});

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
        <Markers />
        <Line />
        <MapEvents />
      </MapContextProvider>
    </MapContainer>
  );
};

export default MapComponent;
