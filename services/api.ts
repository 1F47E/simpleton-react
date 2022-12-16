
import axios from "axios";
import client from "./client"

const API_ENDPOINT_ADDRESS = "/address/signin";
const API_ENDPOINT_SIGNUP = "/auth/signup";
const API_ENDPOINT_VERIFY = "/token/verify";
const API_ENDPOINT_REFRESH = "/token/refresh";
// type AuthType = 'login' | 'signup'
class AuthService {

    // create enum type login or signup
    async addressInfo(address: string): Promise<any> {
        const apiUrl = "/address/"+address
        // return axios.get(apiUrl)
        return client
            .get(apiUrl)
            .then(response => {
                console.log("addressInfo got resp:")
                console.log({ response })
                if (response &&
                    response.data 
                    ) {
                    return response.data
                }
                throw 'data not found'
            })
            .catch(error => {
                console.log("addressInfo error obj:")
                console.log({ error })
                let errorMsg: string;
                if (error &&
                    error.response &&
                    error.response.data &&
                    error.response.data.error) {
                    errorMsg = error.response.data.error
                } else if (error && error.message) {
                    errorMsg = error.message
                } else {
                    errorMsg = "Error, try again later"
                }
                console.log("auth.service error msg:" + errorMsg)
                throw errorMsg
            });
    }


}

export default new AuthService();
