'useClient';
import React, { useEffect, useState } from 'react';
import { MapContainer, Polyline, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { LatLngExpression } from 'leaflet';
import { decode } from '@googlemaps/polyline-codec';

import useApiClient from '@hooks/api/api-client';

const MapComponent = () => {
  const { getRoute } = useApiClient();

  const [line, setLine] = useState<LatLngExpression[]>([]);

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
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Polyline pathOptions={{ color: 'blue' }} positions={line} />
    </MapContainer>
  );
};

export default MapComponent;
