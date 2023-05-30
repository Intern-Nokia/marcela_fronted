import { Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

function Courses({ employee }) {
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre",
    },
    {
      title: "Institución",
      dataIndex: "institucion",
    },
    {
      title: "Modalidad",
      dataIndex: "modalidad",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia",
    },
    {
      title: "Costo",
      dataIndex: "costo",
    },
  ];

  return (
    <>
      <Divider orientation="left">
        <h2>Cursos y Entrenamientos</h2>
      </Divider>
      <Table dataSource={cursos} columns={columns} />
    </>
  );
}

export default Courses;
