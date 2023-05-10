// import { AutoComplete, Avatar, Divider, List, Modal, Typography, Input } from "antd";
// import React, { useState } from "react";
// import "../../App.css";
// import Courses, { vigencia } from "../Courses/Courses";
// import { cursosEmployee } from "../Courses/dataCourses";
// import Projects from "../Projects/Projects";
// import employees from "./data";
// import { cargoPersonal } from "./data";
// import Profiles from "../Profiles/Profiles";
// import Exams from "../Exams/Exams";

// const { Text } = Typography;
// const { Search} = Input

// const filterEmployees = employees.map((p) => {
//   return { value: p.Nombre + ' ' + p.Apellidopaterno };
// });

// const Employees = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedEmployee, setSelectedEmployee] = useState(null);
//   const [status, setStatus] = useState("");
//   const [employee, setEmployee] = useState(null);

//   const handleSearch = (value) => {
//     setEmployee(value);
//   };

//   const handleStatus = (Legajo) => {
//     const filterCurses = cursosEmployee.filter((c) => c.Legajo === Legajo);

//     if (filterCurses.length === 0) {
//       return "No Cumple";
//     }

//     for (let i = 0; i < filterCurses.length; i++) {
//       if (vigencia(filterCurses[i].Fechavencimiento)[0] !== "success") {
//         return "No Cumple";
//       }
//     }

//     return "Cumple";
//   };

//   const showModal = (item) => {
//     setSelectedEmployee(item);
//     setIsModalOpen(true);
//   };
//   const handleOk = () => {
//     setIsModalOpen(false);
//   };

//   const employeeNames = cargoPersonal.map((e) => {
//     return {value: e.Nombre + " " + e.Apellidopaterno}
//   })

//   console.log(employeeNames)

//   const filterEmployee = cargoPersonal.filter((e) => {
//     if (employee === "") {
//       return e;
//     }
//     return e.Nombre + " " + e.Apellidopaterno === employee;
//   });

//   return (
//     <>
//       <div className="search">
//         <AutoComplete
//           options={employeeNames}
//           filterOption={(inputValue, option) =>
//             option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
//           }
//         >
//           <Search
//             placeholder="Buscar empleado"
//             allowClear
//             enterButton="Search"
//             size="large"
//             onSearch={handleSearch}
//           />
//         </AutoComplete>
//       </div>
//       <Divider orientation="left">
//         <h2>Empleados</h2>
//       </Divider>
//       <List
//         pagination={10}
//         style={{
//           maxWidth: "80%",
//           margin: "auto auto",
//         }}
//         dataSource={filterEmployee}
//         renderItem={(item, i) => (
//           <List.Item key={item.Legajo} onClick={() => showModal(item)}>
//             <List.Item.Meta
//               avatar={
//                 <Avatar
//                   src={"https://picsum.photos/200/300?random=" + i}
//                 />
//               }
//               title={item.Nombre + " " + item.Apellidopaterno}
//               description={item.Nombrecargo}
//             />
//             <div>
//               <h3 style={{
//                 width: "100px",
//                 textAlign: "left"
//               }}>
//                 {item.Area}
//               </h3>
//             </div>
//           </List.Item>
//         )}
//       />
//       <Modal
//         title="Información del empleado"
//         open={isModalOpen}
//         onOk={handleOk}
//         onCancel={handleOk}
//         width={800}
//       >
//         {selectedEmployee && <Profiles employee={selectedEmployee}/>}
//         {/* {selectedEmployee && <Projects employee={selectedEmployee} />} */}
//         {selectedEmployee && <Exams employee={selectedEmployee}/>}
//         {selectedEmployee && <Courses employee={selectedEmployee} />}

//       </Modal>
//     </>
//   );
// };

import { Divider, Table } from "antd";
import employees from "./data";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    title: 'Empresa',
    dataIndex: 'Empresa',
    key: 'Empresa'
  },
  {
    title: 'Trabajador',
    dataIndex: 'Trabajador',
    key: 'Trabajador'
  },
  {
    title: 'Cargo',
    dataIndex: 'Cargo',
    key: 'Cargo'
  },
  {
    title: 'Fecha Nacimiento',
    dataIndex: 'Fecha Nacimiento',
    key: 'Fecha Nacimiento'
  },
  {
    title: 'Correo electrónico',
    dataIndex: 'Correo electrónico',
    key: 'Correo electrónico'
  },
  {
    title: 'Número de teléfono',
    dataIndex: 'Número de teléfono',
    key: 'Número de teléfono'
  },
  {
    title: 'Inicio de Contrato',
    dataIndex: 'Inicio de Contrato',
    key: 'Inicio de Contrato'
  }
]

function Employees({ employee }) {

  const navigate = useNavigate()

  return (
    <>
      <Divider orientation="left">
        <h2>Información del empleado</h2>
      </Divider>
      <Table
        dataSource={employees}
        columns={columns}
        onRow={(record, index) => {
          return {
            onClick: e => {
              navigate('/infoEmployee', {state: {employee: record }})
            }
          }
        }}
      />
    </>
  )
}

export default Employees;
