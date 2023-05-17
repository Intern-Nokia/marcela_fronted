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

import { Divider, Table, Input, AutoComplete, Form, Popconfirm, Button, Typography, Tag } from "antd";
import employees from "./data";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React, { useContext, useEffect, useRef } from "react";
import "./employees.css"

const { Search } = Input
const { Text } = Typography
const EditableContext = React.createContext(null)

const EditableRow = ({ index, ...props }) => {
  const [form] = Form.useForm()
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  )
}

const EditableCell = ({
  title,
  editable,
  children,
  dataIndex,
  record,
  handleSave,
  ...restProps
}) => {
  const [editing, setEditing] = useState(false)
  const inputRef = useRef(null)
  const form = useContext(EditableContext)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus()
    }
  }, [editing])
  const toogleEdit = () => {
    setEditing(!editing)
    form.setFieldsValue({
      [dataIndex]: record[dataIndex]
    })
  }
  const save = async () => {
    try {
      const values = await form.validateFields()
      toogleEdit()
      handleSave({
        ...record,
        ...values,
      })
    } catch (errInfo) {
      console.log('Save failed: ', errInfo)
    }
  }
  let childrenNode = children
  if (editable) {
    childrenNode = editing ? (
      <Form.Item
        style={{
          margin: 0
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `${title} requerido`,
          }
        ]}>
        <Input ref={inputRef} onPressEnter={save} onBlur={save} />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24
        }}
        onClick={toogleEdit}
      >
        {children}
      </div>
    )
  }
  return <td {...restProps}>{childrenNode}</td>
}




function Employees() {

  const [dataEmployees, setDataEmployees] = useState(employees)

  const handleDelete = (trabajador) => {
    const newData = dataEmployees.filter((item) => item.Trabajador !== trabajador)
    setDataEmployees(newData)
  }

  const handleEmpresa = () => navigate('/empresas')

  const columns = [
    {
      title: 'Trabajador',
      dataIndex: 'Trabajador',
      key: 'Trabajador',
      render: (text, record) => (
        <a onClick={() => navigate('/infoEmployee', { state: { employee: record } })}><Text strong style={{ color: '#1677ff' }}>{text}</Text></a>
      )
    },
    {
      title: 'RUT',
      dataIndex: 'CI',
      key: 'RUT',
    },
    {
      title: 'AMSA: Proyecto operación',
      dataIndex: 'AMSA Centinela 4540005270',
      key: 'AMSA: Proyecto operación',
      render: (text) => (
        text === 'OK' ? (
           <Tag color="green">{text}</Tag>

        ) : (
          <Tag color="red">{text}</Tag>
        )
      )
    },
    {
      title: 'AMSA: Proyecto operación técnico',
      dataIndex: 'AMSA Centinela 4540005745',
      key: 'AMSA: Proyecto operación técnico',
      render: (text) => (
        text === 'OK' ? (
           <Tag color="green">{text}</Tag>

        ) : (
          <Tag color="red">{text}</Tag>
        )
      )
    },
    {
      title: 'AMSA: Proyecto operación conducción',
      dataIndex: 'Los Bronces N° 12101041',
      key: 'AMSA: Proyecto operación conducción',
      render: (text) => (
        text === 'OK' ? (
           <Tag color="green">{text}</Tag>

        ) : (
          <Tag color="red">{text}</Tag>
        )
      )
    },
    {
      title: 'AMSA: Proyecto operación conducción mina',
      dataIndex: 'BHP Spence',
      key: 'AMSA: Proyecto operación conducción mina',
      render: (text) => (
        text === 'OK' ? (
           <Tag color="green">{text}</Tag>

        ) : (
          <Tag color="red">{text}</Tag>
        )
      )
    },
    {
      title: 'AMSA: Proyecto operación tabajo en altura',
      dataIndex: 'TECK Quebrada Blanca',
      key: 'AMSA: Proyecto operación tabajo en altura',
      render: (text) => (
        text === 'OK' ? (
           <Tag color="green">{text}</Tag>

        ) : (
          <Tag color="red">{text}</Tag>
        )
      )
    },
  ]

  const handleAdd = () => {
    const newData = {
      "Empresa": "Esimtel",
      "Trabajador": "Carlos Alberto Bonilla Henao",
      "CI": "23911707-4",
      "Cargo": "Técnico Supervisor",
      "Habilitado BHP LMS": "OK",
      "NACIONALIDAD": "Venezolano",
      "Fecha Nacimiento": "9/13/1989",
      "Correo electrónico": "cbonilla@esimtel.cl",
      "Número de teléfono": 963929365,
      "Edad": 33,
      "Fecha vencimiento CI": "12/30/2021",
      "Vigencia Visa": "Definitiva",
      "Proyecto actual Abril 2023": "AMSA",
      "Correo personal": "HALLINOBAC@GMAIL.COM",
      "Inicio de Contrato": "11/26/2018",
      "CONTACTO DE EMERGENCIA": "",
      "contacto emergencia": "Kelly Rincon",
      "Fono de emergencia": 935120302,
      "correo emergencia": "",
      "DATOS DOMICILIO": "",
      "Dirección": "PSJE. CERRO POCURO; CALLE LARGA 102",
      "Comuna": "Los Andes",
      "CIUDAD": "",
      "ESTADO CIVIL": "Sin Info",
      "COMPUTADORES": "",
      "Marca": "HP",
      "Computadores": "HP Probook 450 G5",
      "N° Serie": "5CD80879W8",
      "EXÁMENES DE SALUD": "",
      "Exámen altura geográfica vencimiento": "7/6/2025",
      "Vencimiento Examen Altura Física": "7/6/2024",
      "Fecha realización Examen Sílice (vigencia 1 año)": "7/8/2022",
      "Fecha realización Examen Ruido (vigencia 1 año)": "7/8/2022",
      "Altura Geográfica para CENTINELA": "7/6/2021",
      "Drogas realización": "6/29/2021",
      "Psicosensometrico vencimiento": "",
      "CURSOS ACHS": "",
      "Primera respuesta ante emergencias de salud ACHS": "11/6/2019",
      "Curso Extintores": "11/5/2019",
      "Orientación en Prevención de Riesgos": "11/18/2019",
      "Manual Manejo de cargas": "11/6/2019",
      "Ruido (PREXOR)": "11/17/2019",
      "Sílice": "12/15/2020",
      "Conducción defensiva en vehículos livianos": "4/20/2021",
      "CURSOS INSECAP": "",
      "Realización Curso de Altura (duración 2 años)": "4/27/2020",
      "Curso de Aislación y Bloqueo (duración 2 años)": "5/1/2020",
      "Realización Curso de Altura (duración 2 años)__1": "",
      "Realización Curso de Rescate en Altura": "",
      "COVID": "",
      "INDUCCIONES CODELCO": "",
      "CURSOS LMS SPENCE": "",
      "CURSOS LMS MEL": "",
      "CODELCO": "",
      "AMSA Centinela 4540005270": "OK",
      "AMSA Centinela 4540005745": "NOK",
      "Los Bronces N° 12101041": "NOK",
      "BHP Spence": "NOK",
      "TECK Quebrada Blanca": "OK",
      "MEL": ""
    }
    setDataEmployees([...dataEmployees, newData])
  }

  const handleSave = (row) => {
    const newData = [...dataEmployees]
    const trabajador = newData.findIndex((item) => row.Trabajador === item.Trabajador)
    const item = newData[trabajador]
    newData.splice(trabajador, 1, {
      ...item,
      ...row
    })
    setDataEmployees(newData)
  }

  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell
    }
  }
  const defaultColumns = columns.map((col) => {
    if (!col.editable) {
      return col
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave
      })
    }
  })



  const handleSearch = (value) => {
    const filteredEmployee = employees.filter((emp) => {
      if (value === "") {
        return emp
      }
      return emp.Trabajador === value
    })
    setDataEmployees(filteredEmployee)
  }

  const employeeName = employees.map((emp) => {
    return { value: emp.Trabajador }
  })


  const navigate = useNavigate()

  return (
    <>
      <Divider orientation="left">
        <h2>Información del empleado</h2>
      </Divider>
      <AutoComplete options={employeeName}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        style={{
          display: 'flex',
          'justifyContent': 'center'
        }}>
        <Search
          placeholder="Buscar empleado"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          style={{
            margin: '20px auto'
          }}
        />
      </AutoComplete>
      <Button type="primary" onClick={handleAdd}>Añadir</Button>
      <Table
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataEmployees}
        columns={defaultColumns}
      // onRow={(record, index) => {
      //   return {
      //     onClick: e => {
      //       navigate('/infoEmployee', { state: { employee: record } })
      //     }
      //   }
      // }}
      />
    </>
  )
}

export default Employees;
