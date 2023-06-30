import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS PERFILES
export const perfil = async () => {
  try {
    const res = await axios.get(`${URL}/perfil`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CUMPLIMIENTO PERFILES
export const cumplimientoPerfiles = async () => {
  try {
    const res = await axios.get(`${URL}/perfil/personas`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CREAR UN PERFIL
export const nuevoPerfil = async (data) => {
  try {
    const res = await axios.post(`${URL}/perfil`, data);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
