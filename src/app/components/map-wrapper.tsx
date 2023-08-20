'use client';
import { useMemo } from 'react';
import dynamic from 'next/dynamic';

import Loading from '@/app/loading';

const MapWrapper = () => {
  const MapComponent = useMemo(
    () =>
      dynamic(() => import('@components/map-component'), {
        loading: () => <Loading />,
        ssr: false,
      }),
    []
  );

  return <MapComponent />;
};

export default MapWrapper;
