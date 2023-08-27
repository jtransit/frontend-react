'use client';
import { Polyline } from 'react-leaflet';
import { decode } from '@googlemaps/polyline-codec';

import { useMapContext } from '@/app/contexts/map-context';

const colors = ['blue', 'red', 'green', 'purple', 'orange'];

const Line = () => {
  const { routes } = useMapContext();

  // TODO: WIP API routing
  const generateLine = () => {
    if (routes?.length > 0) {
      // TODO: WIP types and routings
      return (routes[0] as any).points.map((p: any, i: number) => {
        return (
          <Polyline
            key={i}
            pathOptions={{ color: colors[(i % colors.length) + 1], weight: 5 }}
            positions={decode(p)}
          />
        );
      });
    }
    return null;
  };

  return <>{generateLine()}</>;
};

export default Line;
