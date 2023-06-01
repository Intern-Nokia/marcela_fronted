import { Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function DotacionUsuario({ employee }) {
  const [dotacionUsuario, setDotacionUsuario] = useState();

  useEffect(() => {
    axios
      .get("http://localhost:5000/epp/" + employee?.CI)
      .then((res) => setDotacionUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre EPP",
      dataIndex: "nombre",
    },
    {
      title: "Fecha de entrega",
      dataIndex: "fechaEntrega",
    },
  ];

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Divider orientation="left">
        <h2>Dotacion y Elementos</h2>
      </Divider>
      <Table dataSource={dotacionUsuario} columns={columns} />
    </div>
  );
}
