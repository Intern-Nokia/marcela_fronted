import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS CURSOS
export const otros = async () => {
  try {
    const res = await axios.get(`${URL}/otros`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CUMPLIMIENTOS CURSOS
export const cumplimientoOtros = async () => {
  try {
    const res = await axios.get(`${URL}/personal/otros`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ASIGNACION DE CURSOS POR PERFIL
export const asignacionOtros = async () => {
  try {
    const res = await axios.get(`${URL}/perfil/otros`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CREAR UN CURSO
export const nuevoOtro = async (data) => {
  try {
    const res = await axios.post(`${URL}/otros`, data);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
