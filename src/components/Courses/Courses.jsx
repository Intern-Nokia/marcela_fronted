// import {
//   Button,
//   Divider,
//   List,
//   Typography,
//   Form,
//   Modal,
//   Input,
//   Select,
// } from "antd";
// import React, { useState } from "react";
// import { cursosEmployee } from "./dataCourses";
// import moment from "moment";
// import "../../App.css";
// import { courses } from "./dataCourses";
// import { LinkOutlined } from "@ant-design/icons"

import { Collapse, Divider, List } from "antd";
import employees from "../Employees/data";
import { courses } from "./dataCourses";

// const { Text } = Typography;

// export const vigencia = (fechaVencimiento) => {
//   const now = moment();
//   const vigencyDate = moment(fechaVencimiento);
//   const inAWeek = now.clone();

//   inAWeek.add(30, "days");

//   if (vigencyDate.isBetween(now, inAWeek)) {
//     return ["warning", "Curso proximo a vencer"];
//   }

//   if (now.isBefore(vigencyDate)) {
//     return ["success", "Curso vigente"];
//   }

//   return ["danger", "Curso vencido"];
// };

// function AllCourses() {
//   return (
//     <List
//       itemLayout="vertical"
//       size="large"
//       pagination={{
//         pageSize: 5,
//       }}
//       dataSource={courses}
//       renderItem={(item, i) => (
//         <List.Item
//           key={item.Nombrecurso}
//           extra={
//             <img
//               height={272}
//               alt="logo"
//               src={"https://picsum.photos/200/300?random=" + i}
//             />
//           }
//         >
//           <List.Item.Meta
//             title={item.Nombrecurso}
//             description={
//               "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec condimentum leo velit, et luctus nibh pulvinar et. Ut tristique erat quis velit accumsan, ut porta lorem varius. Donec ac purus elementum, aliquam orci non, iaculis leo. Suspendisse rhoncus tempor suscipit. Integer facilisis nisi elit, eu congue tellus volutpat vel. Praesent ullamcorper, nulla eget pharetra pulvinar, elit mi iaculis diam, non pulvinar metus nulla ultricies mauris. Sed felis ipsum, egestas vitae nunc in, placerat molestie eros. Nam nisl tellus, malesuada vel varius gravida, luctus a eros. Nam mattis urna at sem aliquet, at vulputate enim finibus. Duis semper, est non porta euismod, leo ligula suscipit ligula, eget iaculis nisi ex et libero. Nam vehicula facilisis sapien nec sollicitudin. Ut augue ligula, ultrices non felis at, vestibulum scelerisque magna."
//             }
//           />
//         </List.Item>
//       )}
//     />
//   );
// }

// function Courses({ employee }) {

//   const [form] = Form.useForm();
//   const [isModalOpen, setIsModalOpen] = useState(false);



//   if (employee === undefined) {
//     return AllCourses();
//   }

//   const listCourses = courses.map((c) => {
//     return {
//       value: c.Nombrecurso,
//       label: c.Nombrecurso,
//     };
//   });

//   const showModal = () => {
//     setIsModalOpen(true);
//   };

//   const onCreate = (values) => {
//     values["Legajo"] = employee.Legajo;
//     values["Apellidopaterno"] = employee.Apellidopaterno;
//     values["Nombre"] = employee.Nombre;

//     cursosEmployee.push(values);
//     setIsModalOpen(false);
//   };

//   const handleOk = () => {
//     form
//       .validateFields()
//       .then((values) => {
//         form.resetFields();
//         onCreate(values);
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleCancel = () => {
//     form.resetFields();
//     setIsModalOpen(false);
//   };

//   const filterCurses = cursosEmployee.filter(
//     (c) => c.Legajo === employee.Legajo
//   );

//   console.log("Employee", employee);
//   console.log(filterCurses);

//   return (
//     <>
//       <Divider orientation="left">
//         <h2>Cursos del usuario</h2>
//       </Divider>
//       <List
//         style={{
//           maxWidth: "80%",
//           margin: "auto auto",
//         }}
//         dataSource={filterCurses}
//         renderItem={(course, i) => (
//           <List.Item key={i}>
//             <List.Item.Meta
//               title={<a href="#">{course.nombre}</a>}
//               description="descripción curso"
//             />
//             <div style={{
//               width: "100px"
//             }}>
//               <Text strong type={vigencia(course.fechaVencimiento)[0]}>
//                 {vigencia(course.fechaVencimiento)[1]}
//               </Text>
//               <p>
//                 {moment(course.fechaVencimiento).format("MMMM Do YYYY")}
//               </p>
//             </div>
//             <a href="https://africau.edu/images/default/sample.pdf"
//               target="_blank"
//               style={{
//                 padding: '10px'
//               }}>
//               <LinkOutlined />
//             </a>
//           </List.Item>
//         )}
//       />
//       <div className="create-btn">
//         <Button type="primary" onClick={showModal}>
//           Añadir curso
//         </Button>
//       </div>

//       <Modal
//         open={isModalOpen}
//         title="Agregar curso al usuario"
//         okText="Ok"
//         cancelText="Cancelar"
//         onOk={handleOk}
//         onCancel={handleCancel}
//       >
//         <Form
//           form={form}
//           layout="vertical"
//           name="Agregar curso"
//           initialValues={{
//             modifier: "public",
//           }}
//         >
//           <Form.Item
//             name="Nombrecurso"
//             label="Nombre del curso"
//             rules={[
//               {
//                 required: true,
//                 message: "Por favor diligencie este campo",
//               },
//             ]}
//           >
//             <Select options={listCourses} />
//           </Form.Item>
//           <Form.Item
//             name="FechaCurso"
//             label="Fecha del curso"
//             rules={[
//               {
//                 required: true,
//                 message: "Por favor diligencie este campo",
//               },
//             ]}
//           >
//             <Input type="date" />
//           </Form.Item>
//           <Form.Item
//             name="Fechavencimiento"
//             label="Fecha vencimiento del curso"
//             rules={[
//               {
//                 required: true,
//                 message: "Por favor diligencie este campo",
//               },
//             ]}
//           >
//             <Input type="date" />
//           </Form.Item>
//         </Form>
//       </Modal>
//     </>
//   );
// }

import { LinkOutlined } from "@ant-design/icons";
import { Typography } from "antd"
import moment from "moment";

const { Text } = Typography
const { Panel } = Collapse

function Courses({ employee }) {

  const cursosACHS = [
    "Primera respuesta ante emergencias de salud ACHS",
    "Curso Extintores",
    "Orientación en Prevención de Riesgos",
    "Manual Manejo de cargas",
    "Ruido (PREXOR)",
    "Sílice",
    "Conducción defensiva en vehículos livianos"
  ]

  const cursosINSECAP = [
    "Realización Curso de Altura (duración 2 años)",
    "Curso de Aislación y Bloqueo (duración 2 años)",
    "Realización Curso de Altura (duración 2 años)__1",
    "Realización Curso de Rescate en Altura"
  ]

  const renderItem = (item) => {
    const isCourse = employee[item] !== ""

    if (isCourse) {
      return (
        <List.Item>
          <List.Item.Meta title={item} />
          <div>
            <Text strong type={moment(employee[item]).isBefore(moment()) ? "danger" : "success"}>
              {moment(employee[item]).isBefore(moment(new Date)) ? "Vencido" : "Vigente"}
            </Text>
            <p>{employee[item]}</p>
          </div>
          <a href="https://africau.edu/images/default/sample.pdf"
              target="_blank"
              style={{
                padding: '20px'
              }}>
              <LinkOutlined />
            </a>
        </List.Item>
      )
    }

  }

  return (
    <>
      <Divider orientation="left">
        <h2>Cursos del empleado</h2>
      </Divider>

      <Collapse size="large"
        accordion
        style={{
          width: '60%',
          margin: 'auto auto'
        }}>
        <Panel header="Cursos ACHS">
          <List
            dataSource={cursosACHS}
            renderItem={renderItem}
          />
        </Panel>
        <Panel header="Cursos INCECAP">
          <List
            dataSource={cursosINSECAP}
            renderItem={renderItem}/>
        </Panel>
      </Collapse>
    </>
  )
}

export default Courses;
