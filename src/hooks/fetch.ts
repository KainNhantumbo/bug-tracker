import api from '../api/axios';
import { AxiosPromise } from 'axios';

type config = {
	method: string;
	url: string;
	data?: object | object[];
};

/**
 * Makes connection to the server api
 * @param config object with connection method, url and data (optional)
 * @returns AxiosPromise<any>
 */
const useConnect = (config: config): AxiosPromise<any> => {
	const acessToken = JSON.parse(
		localStorage.getItem('accessToken') || `{"token":""}`
	);
	const token = `Bearer ${acessToken.token}`;
	return api({
		...config,
		headers: {
			authorization: token,
		},
	});
};

export default useConnect;
