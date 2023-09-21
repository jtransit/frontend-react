import { Marker } from 'react-leaflet';

import { useMapContext } from '@contexts/map-context';

const Markers = () => {
  const {
    directions: {
      location: { from, to },
    },
  } = useMapContext();

  const fromLat = from.latLng?.lat;
  const fromLng = from.latLng?.lng;
  const toLat = to.latLng?.lat;
  const toLng = to.latLng?.lng;

  return (
    <>
      {fromLat && fromLng && <Marker position={[fromLat, fromLng]} />}
      {toLat && toLng && <Marker position={[toLat, toLng]} />}
    </>
  );
};

export default Markers;
