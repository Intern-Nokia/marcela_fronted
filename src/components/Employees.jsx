import React, { useState, useEffect } from "react";
import axios from "axios";
import { Avatar, List, Input, Button, Form, Modal, Radio } from "antd";
import '../App.css'

const employee = {
    legajo: {
        name: 'Legajo',
        required: true
    },
    name: {
        name: 'Nombres',
        required: true
    },
    lastName: {
        name: 'Apellidos',
        required: true
    },
    sex: {
        name: 'Sexo',
        required: true
    },
    maritalStatus: {
        name: 'Estado Civil',
        required: false
    },
    RUT: {
        name: 'RUT',
        required: true
    },
    birthDate: {
        name: 'Fecha de Nacimiento',
        required: false,
        type: 'Date'
    },
    address: {
        name: 'Dirección de Domicilio',
        required: false
    },
    phone: {
        name: 'Teléfono Fijo',
        required: false,
        type: 'number'
    },
    cellphone: {
        name: 'Teléfono Celular',
        required: false,
        type: 'number'
    },
    cargo: {
        name: 'Cargo',
        required: true
    },
    companyEmail: {
        name: 'Correo empresarial',
        required: false,
        type: 'email'
    },
    personalEmail:{
        name: 'Correo Personal',
        required: false,
        type: 'email'
    },
    AFP: {
        name: 'AFP',
        required: false
    },
    ingressDate: {
        name: 'Fecha de Ingreso',
        required: true,
        type: 'date'
    },
    settlementDate: {
        name: 'Fecha de Finiquito',
        required: false,
        type: 'date'
    },
    agreement: {
        name: 'Tipo de contrato',
        required: true
    },
    photo: {
        name: 'Foto del carnet',
        required: false
    },
    polera: {
        name: 'Talla de polera',
        required: false
    },
    bags: {
        name: 'Tall de Pantalon',
        required: false
    },
    shoes: {
        name: 'Talla de Calzado',
        required: false
    }

}


const CollectionCreateForm = ({ open, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  return (
    <Modal
      open={open}
      title="Crear un nuevo empleado"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() =>
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values)
          })
          .catch((info) => {
            console.log("Validate failed:", info);
          })
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: "public",
        }}
      >
        {Object.keys(employee).map((item) => 
            <Form.Item
                name={item}
                label={employee[item]['name']}
                rules={[
                    {
                        required: employee[item]['required'],
                        message: 'Por favor diligencie este campo'
                    }
                ]}
                >
                <Input type={employee[item]['type']} />
                </Form.Item>
        )}
      </Form>
    </Modal>
  );
};

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    setOpen(false);
  }

  const handleInput = (e) => {
    search(e.target.value);
  };

  const search = (name) => {
    axios
      .get("http://localhost:5000/personal/" + name.trim())
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    search("");
  }, []);

  return (
    <div
      id="scrollableDiv"
      style={{
        height: "100vh",
        overflow: "auto",
        padding: "0 16px",
        border: "1px solid rgba(140, 140, 140, 0.35)",
      }}
    >
      <div className="title">
        <h2>Lista de Empleados</h2>
        <Button
            type="primary"
            onClick={() => setOpen(true)}>
                Nuevo empleado
            </Button>
            <CollectionCreateForm
                open={open}
                onCreate={onCreate}
                onCancel={() => {
                    setOpen(false)
                }}
                />
      </div>

      <Input placeholder="Buscar.." onChange={handleInput} />

      <List
        dataSource={employees}
        renderItem={(item) => (
          <List.Item key={item.legajo}>
            <List.Item.Meta
              avatar={<Avatar src={item.image} />}
              title={
                <a href="#">
                  {item.name} {item.lastName}
                </a>
              }
              description={item.legajo}
            />
            <div>{item.RUT}</div>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Employees;
