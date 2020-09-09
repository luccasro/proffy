import axios from 'axios';

const localhost = 'http://localhost:3333';

const api = axios.create({
  baseURL:
    process.env.NODE_ENV === 'development'
      ? localhost
      : process.env.REACT_APP_API_URL ?? localhost,
});

export default api;
