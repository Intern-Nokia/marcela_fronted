// import { Divider, List } from "antd";
// import { examenesPersonal } from "../Employees/data";
// import moment from "moment";
// import { LinkOutlined } from "@ant-design/icons"
// import "./examenes.css"

// function Exams({employee}) {

//     const filteredExamns = examenesPersonal.filter((e) => e.Legajo === employee.Legajo)

//     return (
//         <>
//             <Divider orientation="left">
//                 <h2>Examenes del empleado</h2>
//             </Divider>
//             <List dataSource={filteredExamns}
//                 renderItem={(examen, i) => (
//                     <List.Item key={i} className="list-examenes">
//                         <List.Item.Meta
//                             title={examen.nombre}
//                         />
//                         <div>
//                             {moment(examen.fecha).format("MMMM Do YYYY") + " - " + moment(examen.fechaVencimiento).format("MMMM Do YYYY")}
//                         </div>
//                         <a href="https://africau.edu/images/default/sample.pdf"
//                          target="_blank"
//                          style={{
//                             padding: '10px'
//                          }}>
//                             <LinkOutlined />
//                         </a>
//                     </List.Item>
//                 )}
//             />
//         </>
//     )
// }

import { LinkOutlined } from "@ant-design/icons";
import { Typography, List, Divider, Collapse, Table } from "antd";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const { Text } = Typography;
const { Panel } = Collapse;

function Exams({ employee }) {
  const [examenes, setExamenes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/examenes")
      .then((res) => setExamenes(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre del Exámen",
      dataIndex: "nombre",
    },
    {
      title: "Institución",
      dataIndex: "institucion",
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
        <h2>Examenes Medicos</h2>
      </Divider>
      <Table dataSource={examenes} columns={columns} />
    </>
  );
}

export default Exams;
