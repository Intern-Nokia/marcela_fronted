import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//TODOS LOS CURSOS
export const examenes = async () => {
  try {
    const res = await axios.get(`${URL}/examenes`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CUMPLIMIENTOS CURSOS
export const cumplimientoExamenes = async () => {
  try {
    const res = await axios.get(`${URL}/personal/examenes`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

// ASIGNACION DE CURSOS POR PERFIL
export const asignacionExamenes = async () => {
  try {
    const res = await axios.get(`${URL}/perfil/examenes`);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//CREAR UN CURSO
export const nuevoExamen = async (data) => {
  try {
    const res = await axios.post(`${URL}/examenes`, data);
    return res.status;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
