import axios from 'axios';

const BASE_URL = 'https://lime-shiny-beaver.cyclic.app/api/v1';
// const BASE_URL = 'http://localhost:8500/api/v1'; // development only

const api = axios.create({ baseURL: BASE_URL });

api.defaults.headers.common['Accept'] = 'application/json';
api.defaults.headers.common['Content-Type'] = 'application/json';

export { api as apiClient };
