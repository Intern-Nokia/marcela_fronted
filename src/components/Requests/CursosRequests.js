import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS CURSOS
export const cursos = async () => {
  try {
    const res = await axios.get(`${URL}/cursos`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CUMPLIMIENTOS CURSOS
export const cumplimientoCursos = async () => {
  try {
    const res = await axios.get(`${URL}/personal/cursos`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ASIGNACION DE CURSOS POR PERFIL
export const asignacionCursos = async () => {
  try {
    const res = await axios.get(`${URL}/perfil/cursos`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CREAR UN CURSO
export const nuevoCurso = async (data) => {
  try {
    const res = await axios.post(`${URL}/cursos`, data);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
