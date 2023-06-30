import { BookOutlined } from "@ant-design/icons";
import { Button, Divider, Form, Modal, Select, Table, message } from "antd";
import { useForm } from "antd/es/form/Form";
import axios from "axios";
import { useEffect, useState } from "react";

export function PerfilesUsuario({ employee }) {
  const [perfilesUsuario, setPerfilesUsuario] = useState([]);
  const [perfiles, setPerfiles] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();

  const handleCreate = (values) => {
    const { perfil } = values;

    for (let i = 0; i < perfil.length; i++) {
      let data = {
        persona: employee.CI,
        perfil: perfil[i],
      };
      axios
        .post("http://localhost:5000/perfil/personas", data)
        .then(() => {
          message.success("Perfil agregado exitosamente");
        })
        .catch((err) => {
          console.log(err);
          message.error(
            `No se pudo agregar el perfil. Error: ${err.response.data.error}`
          );
        });
    }
    setIsModalOpen(false);
    cargarPerfilesUsuario();
  };

  /* CARGAR TODOS LOS PERFILES */
  const cargarPerfiles = () => {
    axios
      .get("http://localhost:5000/perfil")
      .then((res) => {
        setPerfiles(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarPerfiles();
  }, []);

  const options = perfiles.map((perfil) => {
    return { value: perfil.id_perfil, label: perfil.nombre_perfil };
  });

  /* CARGAR LOS CURSOS DEL USUARIO*/
  const cargarPerfilesUsuario = () => {
    axios
      .get("http://localhost:5000/perfil/personas")
      .then((res) => {
        setPerfilesUsuario(
          res.data.filter((perfil) => perfil.CI === employee.CI)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarPerfilesUsuario();
  }, []);

  const perfilesColumns = [
    {
      title: "Nombre del perfil",
      dataIndex: "nombre_perfil",
      key: "nombre_perfil",
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
    },
    {
      title: "Proyecto",
      dataIndex: "proyecto",
      key: "proyecto",
    },
    {
      title: "No. de Contrato",
      dataIndex: "numero_contrato",
      key: "numero_contrato",
    },
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Perfiles</h2>
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
        Agregar Perfil al Usuario
      </Button>
      <Table dataSource={perfilesUsuario} columns={perfilesColumns} />
      <Modal
        title={"Agregar Perfil al trabajador: " + employee.trabajador}
        open={isModalOpen}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            handleCreate(values);
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
            label="Nombre del perfil"
            name="perfil"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el curso",
              },
            ]}
          >
            <Select mode="multiple" options={options} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
