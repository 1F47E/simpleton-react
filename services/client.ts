import axios from "axios";

// get the url of the websocket server from vercel envs
// NEXT_PUPLIC prefix is required for vercel to expose the env
const SERVER_HOST = process.env.NEXT_PUBLIC_SERVER_HOST as string;

export default axios.create({
    // TODO: move to env
    baseURL: SERVER_HOST,
    timeout: 5000,
    withCredentials: false // have to stay false for CORS reasons
});



