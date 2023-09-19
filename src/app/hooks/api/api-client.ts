import axios from 'axios';

const useApiClient = (options?: { baseURL?: string }) => {
  const client = axios.create({
    baseURL: options?.baseURL ?? 'https://jtransit.iapos.dev/webapp',
    responseType: 'json',
    timeout: 50000,
  });

  return {
    client,
  };
};

export default useApiClient;
