
import axios from "axios";
import client from "./client"

const API_ENDPOINT_ADDRESS = "/address/signin";
const API_ENDPOINT_SIGNUP = "/auth/signup";
const API_ENDPOINT_VERIFY = "/token/verify";
const API_ENDPOINT_REFRESH = "/token/refresh";
// type AuthType = 'login' | 'signup'
class ApiService {

    // get account info
    /*
    /*
{
  "is_active": bool,
  "status": string,
  "balance_ton": string,
  "balance_nano": int,
  "last_lt": int
}
    // get acc transactions
    /*
[{
    "timestamp": int,
    "direction": string (in | out),
    "amount_ton": string,
    "amount_nano": int,
    "address": string,
    "comment": string,
  },...]
    */
    async apiCall(address: string, call: string): Promise < any > {
        let url = "/account/" + address
        if (call === "transactions") {
            url += "/transactions"
        }
        return client
        .get(url)
        .then(response => {
            console.log("apiCall "+call+" got resp:")
            console.log({ response })
            if (response &&
                response.data
            ) {
                return response.data
            }
            throw 'data not found'
        })
        .catch(error => {
            console.log("apiCall "+call+"  error obj:")
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
            console.log("apiCall "+call+"  error msg:" + errorMsg)
            throw errorMsg
        });
}





}

export default new ApiService();
