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
import NavigationWrapper from '@components/menu/navigation-wrapper';
import Markers from './markers';

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconAnchor: [15, 40],
  popupAnchor: [0, -51],
});

// TODO: theme context logic
const lightMapboxId = 'ckdherlyu0utb1is8ganp07dh';
const darkMapboxId = 'ckdheohzu148s1io9pfuz083f';

const MapComponent = () => {
  return (
    <MapContainer
      center={[10.323267, 123.905601]}
      zoom={13}
      zoomControl={false}
      scrollWheelZoom={true}
      attributionControl={false}
      style={{ height: '100vh', width: '100wh' }}
    >
      <MapContextProvider>
        <TileLayer
          url={`https://api.mapbox.com/styles/v1/boscafsoftware/${lightMapboxId}/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.NEXT_PUBLIC_MAPBOX_TOKEN}`}
        />
        <ContextMenu />
        <NavigationWrapper />
        <Markers />
        <Line />
        <MapEvents />
      </MapContextProvider>
    </MapContainer>
  );
};

export default MapComponent;
