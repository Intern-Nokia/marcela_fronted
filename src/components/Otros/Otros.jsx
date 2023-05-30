import { Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

export function Otros() {
  const [otros, setOtros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/otros")
      .then((res) => setOtros(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre del requisito",
      dataIndex: "nombre",
    },
  ];

  return (
    <>
      <Divider orientation="right">
        <h2>Otros Requisitos</h2>
      </Divider>
      <Table dataSource={otros} columns={columns} />
    </>
  );
}
