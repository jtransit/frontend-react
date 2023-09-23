import axios from 'axios';

const useApiClient = (options?: { baseURL?: string }) => {
  const client = axios.create({
    baseURL: options?.baseURL ?? process.env.NEXT_PUBLIC_ROUTING_API_ENDPOINT,
    responseType: 'json',
    timeout: 50000,
  });

  return {
    client,
  };
};

export default useApiClient;
