import { Button, Card, Divider, Form, Input, Modal } from "antd";
import React, { useState } from "react";
import "../../App.css";
import employees from "./data";

const employee = employees;
const { Meta } = Card;

const randomInt = () => Math.floor(Math.random() * 10);

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
            onCreate(values);
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
        {Object.keys(employee).map((item) => (
          <Form.Item
            name={item}
            label={employee[item]["name"]}
            rules={[
              {
                required: employee[item]["required"],
                message: "Por favor diligencie este campo",
              },
            ]}
          >
            <Input type={employee[item]["type"]} />
          </Form.Item>
        ))}
      </Form>
    </Modal>
  );
};

const Employees = ({ searchEmployee }) => {
  console.log(searchEmployee);
  const [open, setOpen] = useState(false);
  const onCreate = (values) => {
    console.log("Received values of form: ", values);
    setOpen(false);
  };

  const selectedEmployee = employee.filter((p) => p.Nombre === searchEmployee);
  console.log(selectedEmployee);

  return (
    <div>
      <div className="title">
        <Divider orientation="left">
          <h2>Información del empleado</h2>
        </Divider>

        <CollectionCreateForm
          open={open}
          onCreate={onCreate}
          onCancel={() => {
            setOpen(false);
          }}
        />
      </div>
      {/* <Button type="primary" onClick={() => setOpen(true)}>
        Nuevo empleado
      </Button> */}

      <Card
        hoverable={false}
        style={{
          width: 240,
        }}
        cover={<img src={"https://picsum.photos/200?random=" + randomInt} />}
      >
        <Meta
          title={selectedEmployee.Nombre + selectedEmployee.Apellidopaterno}
          description={selectedEmployee.Cargo}
        />
      </Card>
    </div>
  );
};

export default Employees;
