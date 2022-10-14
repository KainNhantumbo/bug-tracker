import { apiClient } from '../api/axios';
import { AxiosError, AxiosPromise, AxiosRequestConfig } from 'axios';
import { useAppContext } from '../context/AppContext';

/**
 * Makes connection to the server api
 * @param config AxiosRequestConfig object
 * @returns AxiosPromise<any>
 */
export const fetchAPI = (config: AxiosRequestConfig): AxiosPromise<any> => {
  const { accessToken, authenticateUser } = useAppContext();

  apiClient.interceptors.response.use(undefined, function (err: AxiosError) {
    const status = err.response?.status;
    if (status == 403) {
      authenticateUser();
    }
    return Promise.reject(err);
  });
  
  return apiClient({
    ...config,
    withCredentials: true,
    headers: { authorization: `Bearer ${accessToken}` },
  });
};
