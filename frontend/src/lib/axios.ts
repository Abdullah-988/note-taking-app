import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_API;

export default axios;
