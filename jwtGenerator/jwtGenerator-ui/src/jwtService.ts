 
import axios from "axios";

export const generateToken = async (data:any) => {
  const response = await axios.post("https://localhost:7050/api/JwtGenerator", data);
  return response.data;
};