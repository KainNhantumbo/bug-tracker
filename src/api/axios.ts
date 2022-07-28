import axios from 'axios';

const BASE_URL = 'http://localhost:6700/api/v1';

const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common['Accept'] = 'application/json';

export default api;
