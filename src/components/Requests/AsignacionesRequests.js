import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

//AÑADIR CURSO COMO REQUISITO PERFIL
export const asignarCursoPerfil = async (data) => {
  try {
    const res = await axios.post(`${URL}/perfil/cursos`, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//AÑADIR EXAMEN COMO REQUISITO PERFIL
export const asignarExamenPerfil = async (data) => {
  try {
    await axios.post(`${URL}/perfil/examenes`, data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//AÑADIR DOTACION COMO REQUISITO PERFIL
export const asignarDotacionPerfil = async (data) => {
  try {
    const res = await axios.post(`${URL}/perfil/dotacion`, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};

//AÑADIR OTRO REQUISITO COMO REQUISITO PERFIL
export const asignarOtroPerfil = async (data) => {
  try {
    const res = await axios.post(`${URL}/perfil/otros`, data);
    return res.data;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
