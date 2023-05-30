import { Collapse, Divider, Table } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";

const { Panel } = Collapse;

export function Dotacion({ employee }) {
  const [epp, setEpp] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/epp")
      .then((res) => setEpp(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre EPP",
      dataIndex: "epp",
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
      <Divider orientation="right">
        <h2>EPP</h2>
      </Divider>
      <Table dataSource={epp} columns={columns} />
    </>
  );
}
