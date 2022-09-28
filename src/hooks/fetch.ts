import api from '../api/axios';
import { AxiosPromise, AxiosRequestConfig } from 'axios';

/**
 * Makes connection to the server api
 * @param config AxiosRequestConfig object
 * @returns AxiosPromise<any>
 */
const useConnectAPI = (config: AxiosRequestConfig): AxiosPromise<any> => {
	const { token } = JSON.parse(
		localStorage.getItem('accessToken') || `{"token":""}`
	);
	return api({
		...config,
		headers: { authorization: `Bearer ${token}` },
	});
};

export default useConnectAPI;
