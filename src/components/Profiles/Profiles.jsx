import { Button, Divider, Form, Input, Modal, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { nuevoPerfil, perfil } from "../Requests/PerfilRequests";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function Profiles() {
  const [dataPerfiles, setDataPerfiles] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const navigate = useNavigate();

  const handleCreate = async (values) => {
    try {
      values.cliente = values.cliente.toUpperCase();
      const status = await nuevoPerfil(values);
      if (status === 201) {
        message.success("perfil creado satisfactoriamente");
        getPerfiles();
      } else {
        message.error("No se ha podido crear el perfil.");
      }
    } catch (err) {
      message.error(`No se ha podido crear el perfil. Error: ${err}`);
    }
    setOpen(false);
  };

  const getPerfiles = async () => {
    try {
      const result = await perfil();
      setDataPerfiles(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPerfiles();
  }, []);

  const columns = [
    {
      title: "Nombre del perfil",
      dataIndex: "nombre_perfil",
      key: "nombre_perfil",
      ...GetColumnsSearchProps("nombre_perfil"),
    },
    {
      title: "Proyecto",
      dataIndex: "proyecto",
      key: "proyecto",
      ...GetColumnsSearchProps("proyecto"),
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      ...GetColumnsSearchProps("cliente"),
    },
    {
      title: "Faena",
      dataIndex: "faena",
      key: "faena",
      ...GetColumnsSearchProps("faena"),
    },
    {
      title: "No. de Contrato",
      dataIndex: "numero_contrato",
      key: "numero_contrato",
      ...GetColumnsSearchProps("numero_contrato"),
    },
    {
      render: (_, record) => (
        <Button
          type="link"
          onClick={() =>
            navigate("requisitos-perfil", { state: { perfil: record } })
          }
          // onClick={() => console.log(record)}
        >
          Ver requisitos del perfil
        </Button>
      ),
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Perfiles</h2>
      </Divider>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: 25, fontSize: 20, height: "auto" }}
        onClick={() => setOpen(true)}
      >
        Crear Perfil
      </Button>
      <Table dataSource={dataPerfiles} columns={columns} />
      <Modal
        title={"Crear Perfil"}
        open={open}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            handleCreate(values);
          });
        }}
        onCancel={() => {
          form.resetFields();
          setOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre del perfil"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del requisito",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Proyecto"
            name="proyecto"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la institución del requisito",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cliente"
            name="cliente"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Faena"
            name="faena"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="No. de Contrato"
            name="numero_contrato"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
