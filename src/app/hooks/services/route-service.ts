import { AxiosRequestConfig } from 'axios';
import useApiClient from '@api/api-client';

const useRouteService = () => {
  const { client } = useApiClient();
  const getRoute = async (
    from: string,
    to: string,
    departBy: string,
    maxWalkDistance: string,
    config?: AxiosRequestConfig
  ) => {
    const _config = {
      url: 'getOTP',
      params: {
        fromPlace: from,
        toPlace: to,
        departBy: departBy,
        maxWalkDistance: maxWalkDistance,
      },
    };
    return await client.request({ ...config, ..._config });
  };

  const getJeepData = async () => {
    return await client.request({
      url: 'getRoutes',
    });
  };

  return {
    getRoute,
    getJeepData,
  };
};

export default useRouteService;
