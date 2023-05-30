import { BookOutlined, FilePdfTwoTone, LinkOutlined } from "@ant-design/icons";
import { Button, Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function CursosUsuario({ employee }) {
  const [cursosUsuario, setCursosUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/cursos/" + employee?.CI)
      .then((res) => setCursosUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "curso",
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion",
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento",
    },
    {
      title: "URL del Certificado",
      dataIndex: "url_certificado",
      render: () => (
        <a href="https://africau.edu/images/default/sample.pdf" target="_blank">
          <FilePdfTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "1.8rem", textAlign: "center", margin: 0 }}
          />
        </a>
      ),
    },
  ];

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Divider orientation="left">
        <h2>Cursos y Entrenamientos</h2>
      </Divider>
      <Button
        type="primary"
        style={{
          margin: ".8em 0",
          fontWeight: "bold",
          padding: "0.3em",
          height: "fit-content",
          fontSize: "1.1rem",
        }}
      >
        <BookOutlined style={{ fontSize: "1.8rem", margin: 0 }} />
        Agregar Curso al Usuario
      </Button>
      <Table dataSource={cursosUsuario} columns={columns} />
    </div>
  );
}
