import axios from "axios";

//const apiPort = "5000";
//const localApi = `http://localhost:${apiPort}/api`;
const externalApiUrl = `https://eventapiwebpedro.azurewebsites.net/api`;

const api = axios.create({
    baseURL : externalApiUrl
})

export default api;