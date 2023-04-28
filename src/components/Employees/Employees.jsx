import { Avatar, Button, Card, Divider, Form, Input, List, Modal, Typography } from "antd";
import React, { useState } from "react";
import "../../App.css";
import employees from "./data";
import Courses from "../Courses/Courses";
import Projects from "../Projects/Projects";
import { vigencia } from "../Courses/Courses";
import { cursosEmployee } from "../Courses/dataCourses";

const { Meta } = Card;
const { Text } = Typography

const randomInt = () => Math.floor(Math.random() * 10);

const Employees = ({ employee }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [status, setStatus] = useState("")

  const handleStatus = (Legajo) => {

    const filterCurses = cursosEmployee.filter((c) => c.Legajo === Legajo)

    if (filterCurses.length === 0){
      return "No Cumple"
    }

    for (let i = 0; i < filterCurses.length; i++){
      if (vigencia(filterCurses[i].Fechavencimiento)[0] !== "success"){
        return "No Cumple"
      }
    }

    return "Cumple"

  }


  const showModal = (item) => {
    setSelectedEmployee(item)
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const filterEmployee = employees.filter((e) => {
    if (employee === "") {
      return e;
    }
    return e.Nombre + " " + e.Apellidopaterno === employee;
  });

  return (
    <>
      <Divider orientation="left">
        <h2>Empleados</h2>
      </Divider>
      <List
        style={{
          maxWidth: "80%",
          margin: "auto auto",
        }}
        dataSource={filterEmployee}
        renderItem={(item) => (
          <List.Item key={item.Legajo} onClick={() => showModal(item)}>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={"https://picsum.photos/200/300?random=" + randomInt}
                />
              }
              title={item.Nombre + " " + item.Apellidopaterno}
            />
            <div>
              <h3><Text type={handleStatus(item.Legajo) === "Cumple" ? "success" : "danger"}>{handleStatus(item.Legajo)}</Text></h3>
            </div>
          </List.Item>
        )}
      />
      <Modal
        title="Información del empleado"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleOk}
        width={800}
      >
        {selectedEmployee && <Courses employee={selectedEmployee} />}
        {selectedEmployee && <Projects employee={selectedEmployee}/>}
      </Modal>
    </>
  );
};
export default Employees;
