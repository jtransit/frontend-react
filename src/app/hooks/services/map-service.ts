import { useState } from 'react';

import { AxiosRequestConfig } from 'axios';
import useApiClient from '@api/api-client';

import { Suggestions, defaultSuggestions } from '@app-types/map-service';

const useMapService = () => {
  const { client } = useApiClient({
    baseURL: 'https://api.mapbox.com/geocoding/v5/',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [searchSuggestions, setSearchSuggestions] =
    useState<Suggestions>(defaultSuggestions);

  const search = async (key: string, config?: AxiosRequestConfig) => {
    const _config = {
      url: `mapbox.places/${key}.json`,
      params: {
        access_token: process.env.NEXT_PUBLIC_MAPBOX_TOKEN,
      },
    };

    setIsLoading(true);
    const response = await client.request({ ...config, ..._config });
    setSearchSuggestions(response.data);
    setIsLoading(false);

    return response;
  };

  return {
    isLoading,
    searchSuggestions,
    search,
  };
};

export default useMapService;
