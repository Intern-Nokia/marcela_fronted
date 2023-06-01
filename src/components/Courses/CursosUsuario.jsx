import { BookOutlined, FilePdfTwoTone, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Modal,
  Select,
  Table,
  Upload,
} from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

export function CursosUsuario({ employee }) {
  const [cursosUsuario, setCursosUsuario] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cursos, setCursos] = useState([]);
  const [form] = useForm();

  /* CARGAR TODOS LOS CURSOS */
  useEffect(() => {
    axios
      .get("http://localhost:5000/cursos")
      .then((res) => setCursos(res.data))
      .catch((err) => console.log(err));
  }, []);

  /* CARGAR LOS CURSOS DEL USUARIO*/
  useEffect(() => {
    axios
      .get("http://localhost:5000/cursos/" + employee?.CI)
      .then((res) => setCursosUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const columns = [
    {
      title: "Nombre del curso",
      dataIndex: "curso",
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion",
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento",
    },
    {
      title: "URL del Certificado",
      dataIndex: "url_certificado",
      render: () => (
        <a href="https://africau.edu/images/default/sample.pdf" target="_blank">
          <FilePdfTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "1.8rem", textAlign: "center", margin: 0 }}
          />
        </a>
      ),
    },
  ];

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Divider orientation="left">
        <h2>Cursos y Entrenamientos</h2>
      </Divider>
      <Button
        type="primary"
        style={{
          margin: ".8em 0",
          fontWeight: "bold",
          padding: "0.3em",
          height: "fit-content",
          fontSize: "1.1rem",
        }}
        onClick={() => setIsModalOpen(true)}
      >
        <BookOutlined style={{ fontSize: "1.8rem", margin: 0 }} />
        Agregar Curso al Usuario
      </Button>
      <Table dataSource={cursosUsuario} columns={columns} />
      <Modal
        title={"Agregar Curso al trabajador: " + employee.trabajador}
        open={isModalOpen}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            // handleCreate(values);
            console.log(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          form.resetFields();
          setIsModalOpen(false);
        }}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nombre del curso"
            name="curso"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el curso",
              },
            ]}
          >
            <Select
              options={cursos.map((curso) => {
                return { value: curso.nombre };
              })}
            />
          </Form.Item>
          <Form.Item
            label="Fecha de Realización"
            name="fechaRealizacion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha de realizacion",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item
            label="Fecha de Vencimiento"
            name="fecha_vencimiento"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha vencimiento",
              },
            ]}
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Cargar Certificado" name="url_certificado">
            <Upload action="/upload.do" listType="picture-card">
              <div>
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </div>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
