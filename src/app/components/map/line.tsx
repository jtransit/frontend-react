'use client';
import { Polyline } from 'react-leaflet';
import { decode } from '@googlemaps/polyline-codec';

import { useMapContext } from '@/app/contexts/map-context';

const colors = ['blue', 'red', 'green', 'purple', 'orange'];

const Line = () => {
  const {
    directions: { selectedRoute },
  } = useMapContext();

  const generateLine = () => {
    return (selectedRoute as any)?.points.map((p: any, i: number) => {
      return (
        <Polyline
          key={i}
          pathOptions={{
            color: colors[(i % colors.length) + 1],
            weight: 5,
          }}
          positions={decode(p)}
        />
      );
    });
  };

  return <>{generateLine()}</>;
};

export default Line;
