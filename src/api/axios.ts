import axios from 'axios';

const BASE_URL = 'http://localhost:8500/api/v1';

const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';
// interceptors
api.interceptors.response.use(undefined, (err) => {
	const status = err.response?.status;
	if (status == 403) {
		location.assign('/tab/login');
	}
});

export default api;
