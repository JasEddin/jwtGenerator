 
import axios from "axios";

export const generateToken = async (pnr:string, env:string, preset: "individual" | "officer" | "system",parameters: Record<string, string>, actAsPnr: string ) => {
const req= {
  preset,
  actAsPnr:actAsPnr,
  nationalid: pnr,
  environment: env,
  "parameters": {
  "sub": pnr,
   ...parameters 
    }}
  const response = await axios.post("https://localhost:7050/api/JwtGenerator", req);
  return response.data;
};