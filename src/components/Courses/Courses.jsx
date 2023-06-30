import { PlusCircleOutlined } from "@ant-design/icons";
import {
  Button,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Radio,
  Table,
  message,
} from "antd";
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import GetColumnsSearchProps from "../GetColumnsSearchProps";
import { cursos, nuevoCurso } from "../Requests/CursosRequests";

function Courses() {
  const [dataCursos, setDataCursos] = useState([]);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [form] = useForm();

  const handleCreate = async (values) => {
    try {
      values.institucion = values.institucion.toUpperCase();
      const status = await nuevoCurso(values);
      if (status === 201) {
        message.success("Curso creado satisfactoriamente");
        getCursos();
      } else {
        message.error("No se ha podido crear el curso.");
      }
    } catch (err) {
      message.error(`No se ha podido crear el curso. Error: ${err}`);
    }
    setOpen(false);
  };

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const getCursos = async () => {
    try {
      const result = await cursos();
      setDataCursos(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getCursos();
  }, []);

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre",
      key: "nombre_curso",
      ...GetColumnsSearchProps("nombre"),
    },
    {
      title: "Institución",
      dataIndex: "institucion",
      key: "institucion_curso",
      ...GetColumnsSearchProps("institucion"),
    },
    {
      title: "Modalidad",
      dataIndex: "modalidad",
      key: "modalidad_curso",
      ...GetColumnsSearchProps("modalidad"),
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia",
      key: "vigencia_curso",
      render: (text) => <>{text} meses</>,
    },
    {
      title: "Costo",
      dataIndex: "costo",
      key: "costo_curso",
      render: (text) => <>${text}</>,
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Cursos y Entrenamientos</h2>
      </Divider>
      <Button
        type="primary"
        size="large"
        icon={<PlusCircleOutlined />}
        style={{ marginBottom: 25, fontSize: 20, height: "auto" }}
        onClick={() => setOpen(true)}
      >
        Crear Curso
      </Button>
      <Table dataSource={dataCursos} columns={columns} />
      <Modal
        title={"Crear un Curso"}
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
            label="Nombre del curso"
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
            label="Modalidad"
            name="modalidad"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la modalidad del curso",
              },
            ]}
          >
            <Radio.Group onChange={onChange} value={value}>
              <Radio value="Presencial">Presencial</Radio>
              <Radio value="Online">Online</Radio>
            </Radio.Group>
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

export default Courses;
