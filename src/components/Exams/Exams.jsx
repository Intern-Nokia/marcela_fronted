import {
  Divider,
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { examenes, nuevoExamen } from "../Requests/ExamenesRequests";
import { PlusCircleOutlined } from "@ant-design/icons";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function Exams() {
  const [dataExamenes, setDataExamenes] = useState([]);
  const [open, setOpen] = useState(false);
  const [form] = useForm();

  const handleCreate = async (values) => {
    try {
      values.institucion = values.institucion.toUpperCase();
      const status = await nuevoExamen(values);
      if (status === 201) {
        message.success("Examen creado satisfactoriamente");
        getExamenes();
      } else {
        message.error("No se ha podido crear el examen.");
      }
    } catch (err) {
      message.error(`No se ha podido crear el examen. Error: ${err}`);
    }
    setOpen(false);
  };

  const getExamenes = async () => {
    try {
      const result = await examenes();
      setDataExamenes(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getExamenes();
  }, []);

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre",
      key: "nombre_examen",
      ...GetColumnsSearchProps("nombre"),
    },
    {
      title: "Institución",
      dataIndex: "institucion",
      key: "institucion_examen",
      ...GetColumnsSearchProps("institucion"),
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia",
      key: "vigencia_examen",
      render: (text) => <>{text} meses</>,
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo_examen",
      render: (text) => <>${text}</>,
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Examenes</h2>
      </Divider>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: 25, fontSize: 20, height: "auto" }}
        onClick={() => setOpen(true)}
      >
        Crear Examen
      </Button>
      <Table dataSource={dataExamenes} columns={columns} />
      <Modal
        title={"Crear un Examen"}
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
            label="Nombre del examen"
            name="nombre"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el curso",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Institución"
            name="institucion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la institución",
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

export default Exams;
