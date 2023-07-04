import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS CURSOS
export const login = async (data) => {
  try {
    const res = await axios.post(`${URL}/login`, data);
    return res;
  } catch (err) {
    return err.response;
  }
};
