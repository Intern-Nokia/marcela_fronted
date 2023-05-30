import {
  AutoComplete,
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import {
  DeleteTwoTone,
  UserAddOutlined,
  UserDeleteOutlined,
} from "@ant-design/icons";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import employees from "./data";
import "./employees.css";

const { Search } = Input;
const { Text } = Typography;

function Employees() {
  /* Hooks */
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [modalTitle, setModalTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();
  const [dataEmployees, setDataEmployees] = useState([]);
  const [employeeName, setEmployeeName] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/")
      .then((res) => {
        setDataEmployees(res.data);
        setEmployeeName(
          res.data.map((emp) => {
            return { value: emp.trabajador };
          })
        );
      })
      .catch((err) => console.error("Error: ", err));
  }, []);

  const onFinishFailed = (errorInfo) => {
    messageApi.open({
      type: "error",
      content:
        "Error al enviar el formulario. Verifique que todos los campos obligatorios esten diligenciados.",
    });
  };

  const handleCreate = (values) => {
    setSelectedEmployee({});
    axios
      .post("http://localhost:5000/personal/", values)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Trabajador agregado exitosamente",
        });
        updateEmployees();
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Error ", err);
        messageApi.open({
          type: "error",
          content: "No se pudo agregar el trabajador. Error: " + { err },
        });
      });
    form.resetFields();
  };

  const handleDelete = (rut) => {
    axios
      .patch("http://localhost:5000/personal/" + rut)
      .then(() => {
        messageApi.open({
          type: "success",
          content: "Usuario eliminado exitosamente",
        });
        updateEmployees();
      })
      .catch((err) => {
        messageApi.open({
          type: "error",
          content: "Error al eliminar usuario, intente nuevamente",
        });
      });
  };

  const updateEmployees = () => {
    axios
      .get("http://localhost:5000/personal/")
      .then((res) => {
        setDataEmployees(res.data);
        setEmployeeName(
          res.data.map((emp) => {
            return { value: emp.trabajador };
          })
        );
      })
      .catch((err) => console.error("Error", err));
  };

  const handleSearch = (value) => {
    const filteredEmployee = dataEmployees.filter((emp) => {
      if (value === "") {
        updateEmployees();
      }
      return emp.trabajador === value;
    });
    setDataEmployees(filteredEmployee);
  };

  const handleEdit = (employee) => {
    console.log(employee);
    setModalTitle("Editar trabajador");
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  const columns = [
    {
      title: "Trabajador",
      dataIndex: "trabajador",
      key: "Trabajador",
      render: (text, record) => (
        <a
          onClick={() =>
            navigate("/infoEmployee", { state: { employee: record } })
          }
        >
          <Text strong style={{ color: "#1677ff" }}>
            {text}
          </Text>
        </a>
      ),
    },
    {
      title: "RUT",
      dataIndex: "CI",
      key: "RUT",
    },
    {
      title: "AMSA: Proyecto operación",
      dataIndex: "AMSA Centinela 4540005270",
      key: "AMSA: Proyecto operación",
      onHeaderCell: (col) => ({
        onClick: () => {
          navigate("/profile", {
            state: col.title,
          });
        },
      }),
      render: (text) =>
        text === "OK" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
    },
    {
      title: "AMSA: Proyecto operación técnico",
      dataIndex: "AMSA Centinela 4540005745",
      key: "AMSA: Proyecto operación técnico",
      render: (text) =>
        text === "OK" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
      onHeaderCell: (col) => ({
        onClick: () => {
          navigate("/profile", {
            state: col.title,
          });
        },
      }),
    },
    {
      title: "AMSA: Proyecto operación conducción",
      dataIndex: "Los Bronces N° 12101041",
      key: "AMSA: Proyecto operación conducción",
      render: (text) =>
        text === "OK" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
      onHeaderCell: (col) => ({
        onClick: () => {
          navigate("/profile", {
            state: col.title,
          });
        },
      }),
    },
    {
      title: "AMSA: Proyecto operación conducción mina",
      dataIndex: "BHP Spence",
      key: "AMSA: Proyecto operación conducción mina",
      render: (text) =>
        text === "OK" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
      onHeaderCell: (col) => ({
        onClick: () => {
          navigate("/profile", {
            state: col.title,
          });
        },
      }),
    },
    {
      title: "AMSA: Proyecto operación tabajo en altura",
      dataIndex: "TECK Quebrada Blanca",
      key: "AMSA: Proyecto operación tabajo en altura",
      render: (text) =>
        text === "OK" ? (
          <Tag color="green">{text}</Tag>
        ) : (
          <Tag color="red">{text}</Tag>
        ),
      onHeaderCell: (col) => ({
        onClick: () => {
          navigate("/profile", {
            state: col.title,
          });
        },
      }),
    },
    {
      title: "Acción",
      render: (_, record) => (
        <>
          {contextHolder}
          <Button type="link" onClick={() => handleDelete(record.CI)}>
            <UserDeleteOutlined style={{ margin: 0, fontSize: "1.8rem" }} />
            <p style={{ margin: 0 }}>Eliminar</p>
          </Button>
        </>
      ),
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Divider orientation="left">
        <h2>Información del empleado</h2>
      </Divider>
      <AutoComplete
        options={employeeName}
        filterOption={(inputValue, option) =>
          option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
        }
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Search
          placeholder="Buscar empleado"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
          style={{
            margin: "20px auto",
          }}
        />
      </AutoComplete>

      <Button
        type="primary"
        style={{
          fontSize: "1.2rem",
          margin: "20px",
          padding: ".2rem",
          textAlign: "center",
          height: "auto",
        }}
        onClick={() => {
          setModalTitle("Agregar trabajador");
          setIsModalOpen(true);
        }}
      >
        <UserAddOutlined style={{ margin: 0 }} /> Agregar trabajador
      </Button>

      <Table dataSource={dataEmployees} columns={columns} on />

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleCreate(values);
            })
            .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          form.resetFields();
          setSelectedEmployee(null);
          setIsModalOpen(false);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedEmployee}
          autoComplete="off"
        >
          <Form.Item
            label="RUT"
            name="CI"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el RUT del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Empresa"
            name="empresa"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la Empresa del tranajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre completo"
            name="trabajador"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Nombre del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cargo"
            name="cargo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Cargo del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="habilitadoBHP">
            <Checkbox>Habilitado BHP LMS?</Checkbox>
          </Form.Item>
          <Form.Item label="Nacionalidad" name="nacionalidad">
            <Input />
          </Form.Item>
          <Form.Item
            label="Fecha de Nacimiento"
            rules={[
              {
                required: true,
                message:
                  "Por favor ingrese la fecha de nacimiento del trabajador",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Correo Electrónico"
            name="correo"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Número de teléfono"
            name="telefono"
            rules={[
              {
                type: "number",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Fecha de vencimiento de CI">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Vigencia Visa">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Proyecto Actual" name="proyectoActual">
            <Input />
          </Form.Item>
          <Form.Item
            label="Correo Personal"
            name="correoPersonal"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Inicio de Contrato">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion">
            <Input />
          </Form.Item>
          <Form.Item label="Comuna" name="comuna">
            <Input />
          </Form.Item>
          <Form.Item label="Ciudad" name="ciudad">
            <Input />
          </Form.Item>
          <Form.Item label="Estado Civil" name="estadoCivil">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}

export default Employees;
