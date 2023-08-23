import axios, { AxiosRequestConfig } from 'axios';

const useApiClient = () => {
  const client = axios.create({
    baseURL: 'https://jtransit.iapos.dev/webapp',
    responseType: 'json',
    timeout: 20000,
  });

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

  return {
    getRoute,
  };
};

export default useApiClient;
