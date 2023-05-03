import { Button, Divider, List, Typography, Form, Modal, Input } from "antd";
import React, { useState } from "react";
import { cursosEmployee } from "./dataCourses";
import moment from "moment";
import "../../App.css";

const { Text } = Typography;

export const vigencia = (fechaVencimiento) => {
  const now = moment();
  const vigencyDate = moment(fechaVencimiento);
  const inAWeek = now.clone();

  inAWeek.add(30, "days");

  if (vigencyDate.isBetween(now, inAWeek)) {
    return ["warning", "Curso proximo a vencer"];
  }

  if (now.isBefore(vigencyDate)) {
    return ["success", "Curso vigente"];
  }

  return ["danger", "Curso vencido"];
};

const Courses = ({ employee }) => {
  const [form] = Form.useForm();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const onCreate = (values) => {
    values["Legajo"] = employee.Legajo
    values["Apellidopaterno"] = employee.Apellidopaterno
    values["Nombre"] = employee.Nombre
    
    cursosEmployee.push(values)
    setIsModalOpen(false);
  };

  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        onCreate(values);
      })
      .catch((err) => console.log(err));
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const filterCurses = cursosEmployee.filter(
    (c) => c.Legajo === employee.Legajo
  );

  console.log("Employee", employee);
  console.log(filterCurses);

  return (
    <>
      <Divider orientation="left">
        <h2>Cursos del usuario</h2>
      </Divider>
      <List
        style={{
          maxWidth: "80%",
          margin: "auto auto",
        }}
        dataSource={filterCurses}
        renderItem={(course) => (
          <List.Item key={course.Nombrecurso}>
            <List.Item.Meta
              title={<a href="#">{course.Nombrecurso}</a>}
              description="descripción curso"
            />
            <div>
              <Text strong type={vigencia(course.Fechavencimiento)[0]}>
                {vigencia(course.Fechavencimiento)[1]}
              </Text>
            </div>
          </List.Item>
        )}
      />
      <div className="create-btn">
        <Button type="primary" onClick={showModal}>
          Añadir curso
        </Button>
      </div>

      <Modal
        open={isModalOpen}
        title="Agregar curso al usuario"
        okText="Ok"
        cancelText="Cancelar"
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          layout="inline"
          name="Agregar curso"
          initialValues={{
            modifier: "public",
          }}
        >
          <Form.Item
            name="Nombrecurso"
            label="Nombre del curso"
            rules={[
              {
                required: true,
                message: "Por favor diligencie este campo",
              },
            ]}
          >
            <Input></Input>
          </Form.Item>
          <Form.Item
            name="FechaCurso"
            label="Fecha del curso"
            rules={[
              {
                required: true,
                message: "Por favor diligencie este campo",
              },
            ]}>
              <Input type="date" />
            </Form.Item>
            <Form.Item
            name="Fechavencimiento"
            label="Fecha vencimiento del curso"
            rules={[
              {
                required: true,
                message: "Por favor diligencie este campo",
              },
            ]}>
              <Input type="date" />
            </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default Courses;
