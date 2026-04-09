 
import axios from "axios";

export const generateToken = async (pnr:string, env:string) => {

const req=JSON.parse(`{
  "clientid": "i_web_individual_short",
  "client_secret": "mysecret",
  "preset": "individual",
  "grant_type": "client_credentials",
  "sub": "${pnr}",
  "NationalId": "${pnr}",
  "scope": "account_read system_read",
  "environment": "${env}"
}`);
  const response = await axios.post("https://localhost:7050/api/JwtGenerator", req);
  return response.data;
};