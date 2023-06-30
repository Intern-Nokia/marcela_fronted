import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Table,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { dotacion, nuevoDotacion } from "../Requests/DotacionRequests";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function Dotacion() {
  const [dataDotacion, setDataDotacion] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const handleCreate = async (values) => {
    try {
      const status = await nuevoDotacion(values);
      if (status === 201) {
        message.success("Dotación creado satisfactoriamente");
        getDotacion();
      } else {
        message.error("No se ha podido crear la dotación.");
      }
    } catch (err) {
      message.error(`No se ha podido crear la dotación. Error: ${err}`);
    }
    setOpen(false);
  };

  const getDotacion = async () => {
    try {
      const result = await dotacion();
      setDataDotacion(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDotacion();
  }, []);

  const columns = [
    {
      title: "Nombre del elemento de dotación",
      dataIndex: "nombre",
      key: "nombre_dotacion",
      ...GetColumnsSearchProps("nombre"),
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia",
      key: "vigencia_dotacion",
      render: (text) => <>{text} meses</>,
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo_dotacion",
      render: (text) => <>${text}</>,
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Dotación</h2>
      </Divider>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: 25, fontSize: 20, height: "auto" }}
        onClick={() => setOpen(true)}
      >
        Crear Dotación
      </Button>
      <Table dataSource={dataDotacion} columns={columns} />
      <Modal
        title={"Crear un elemento de Dotación"}
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
            label="Nombre del elemento de Dotación"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre de Dotación",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Vigencia (meses)"
            name="vigencia"
            rules={[
              {
                required: true,
                type: "number",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="Costo"
            name="costo"
            rules={[
              {
                required: true,
                type: "number",
              },
            ]}
          >
            <InputNumber min={0} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
