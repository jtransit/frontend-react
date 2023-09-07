import axios, { AxiosRequestConfig } from 'axios';

const useApiClient = () => {
  const client = axios.create({
    baseURL: 'https://jtransit.iapos.dev/webapp',
    responseType: 'json',
    timeout: 30000,
  });

  return {
    client,
  };
};

export default useApiClient;
