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
import { useEffect, useState } from "react";
import { nuevoOtro, otros } from "../Requests/OtrosRequests";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function Otros() {
  const [dataOtros, setDataOtros] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const handleCreate = async (values) => {
    try {
      values.institucion = values.institucion.toUpperCase();
      const status = await nuevoOtro(values);
      if (status === 201) {
        message.success("otro requisito creado satisfactoriamente");
        getOtros();
      } else {
        message.error("No se ha podido crear el otro requisito.");
      }
    } catch (err) {
      message.error(`No se ha podido crear el otro requisito. Error: ${err}`);
    }
    setOpen(false);
  };

  const getOtros = async () => {
    try {
      const result = await otros();
      setDataOtros(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getOtros();
  }, []);

  const columns = [
    {
      title: "Nombre del otro requisito",
      dataIndex: "nombre_otro",
      key: "nombre_otro",
      ...GetColumnsSearchProps("nombre_otro"),
    },
    {
      title: "Institución",
      dataIndex: "institucion_otro",
      key: "institucion_otro",
      ...GetColumnsSearchProps("institucion_otro"),
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia_otro",
      key: "vigencia_otro",
      render: (text) => <>{text} meses</>,
    },
    {
      title: "Costo",
      dataIndex: "costo_otro",
      key: "costo_otro",
      render: (text) => <>${text}</>,
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Otros</h2>
      </Divider>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: 25, fontSize: 20, height: "auto" }}
        onClick={() => setOpen(true)}
      >
        Crear Otro Requisito
      </Button>
      <Table dataSource={dataOtros} columns={columns} />
      <Modal
        title={"Crear otro requisito"}
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
            label="Nombre del otro requisito"
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
            label="Insitución del otro requisito"
            name="institucion"
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
