import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS DOTACION
export const dotacion = async () => {
  try {
    const res = await axios.get(`${URL}/dotacion`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CUMPLIMIENTOS DOTACION
export const cumplimientoDotacion = async () => {
  try {
    const res = await axios.get(`${URL}/personal/dotacion`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ASIGNACION DE DOTACION POR PERFIL
export const asignacionDotacion = async () => {
  try {
    const res = await axios.get(`${URL}/perfil/dotacion`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CREAR UN CURSO
export const nuevoDotacion = async (data) => {
  try {
    const res = await axios.post(`${URL}/dotacion`, data);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
