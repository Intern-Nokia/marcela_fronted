import {
  BookOutlined,
  FilePdfTwoTone,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Modal,
  Select,
  Table,
  Tag,
  Upload,
  message,
} from "antd";

import { useForm } from "antd/es/form/Form";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";
import { props } from "../Requests/Upload";
import dayjs from "dayjs";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function CursosUsuario({ employee }) {
  const [cursosUsuario, setCursosUsuario] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [vigencia, setVigencia] = useState(0);
  const [checked, setChecked] = useState(true);

  const handleFormChange = (_, allFields) => {
    const curso = cursos.filter((curso) => curso.id === allFields[0].value);
    setVigencia(curso[0].vigencia);
  };

  const handleCreate = (values) => {
    values["persona"] = employee.CI;

    values.fecha_presentacion = values.fecha_presentacion.format("YYYY/MM/DD");
    values["certificado"] = values.certificado.file.response.url;

    if (values.fecha_vencimiento === undefined) {
      const vencimiento = moment(values.fecha_presentacion);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento = values.fecha_vencimiento.format("YYYY/MM/DD");
    }
    axios
      .post("http://localhost:5000/personal/cursos", values)
      .then((res) => {
        message.success("Curso agregado exitosamente");
        cargarCursosUsuario();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el curso. Error: ${err}`)
      );
    setIsModalOpen(false);
  };

  /* CARGAR TODOS LOS CURSOS */
  const cargarCursos = () => {
    axios
      .get("http://localhost:5000/cursos")
      .then((res) => {
        setCursos(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarCursos();
  }, []);

  const options = cursos.map((curso) => {
    return { value: curso.id, label: curso.nombre };
  });

  /* CARGAR LOS CURSOS DEL USUARIO*/
  const cargarCursosUsuario = () => {
    axios
      .get("http://localhost:5000/personal/cursos")
      .then((res) => {
        setCursosUsuario(
          res.data.filter((curso) => curso.trabajador === employee.trabajador)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarCursosUsuario();
  }, []);

  const cursosColumns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre_curso",
      key: "nombre_curso",
      ...GetColumnsSearchProps("nombre_curso"),
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_curso",
      key: "fecha_realizacion_curso",
      render: (text) => <>{moment(text).format("YYYY/MM/DD")}</>,
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_curso",
      key: "fecha_vencimiento_curso",
      render: (text, record) => {
        const now = moment();
        const inAMonth = moment().add(1, "M");

        if (moment(text).isBetween(now, inAMonth)) {
          return (
            <>
              <div>{moment(text).format("YYYY/MM/DD")}</div>{" "}
              <Tag color="yellow">PROXIMO A VENCER</Tag>
            </>
          );
        }
        if (now.isBefore(moment(text))) {
          return (
            <>
              <div>{moment(text).format("YYYY/MM/DD")}</div>{" "}
              <Tag color="green">VIGENTE</Tag>
            </>
          );
        }

        return (
          <>
            <div>{moment(text).format("YYYY/MM/DD")}</div>{" "}
            <Tag color="red">VENCIDO</Tag>
          </>
        );
      },
    },
    {
      title: "URL del Certificado",
      dataIndex: "certificado_curso",
      key: "url_certificado_curso",
      render: (text) => (
        <a
          href={text ? text : "https://africau.edu/images/default/sample.pdf"}
          target="_blank"
          rel="noreferrer"
        >
          <FilePdfTwoTone
            twoToneColor="#eb2f96"
            style={{ fontSize: "1.8rem", textAlign: "center", margin: 0 }}
          />
        </a>
      ),
    },
  ];

  return (
    <div>
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
      <Table dataSource={cursosUsuario} columns={cursosColumns} />
      <Modal
        title={"Agregar Curso al trabajador: " + employee.trabajador}
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
        <Form form={form} layout="vertical" onFieldsChange={handleFormChange}>
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
              options={options}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? "")
                  .toLowerCase()
                  .includes(input.toLowerCase().trim())
              }
            />
          </Form.Item>
          <Form.Item
            label="Fecha de Realización"
            name="fecha_presentacion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha de realizacion",
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>
          <Form.Item>
            <Checkbox
              checked={checked}
              onChange={(e) => setChecked(e.target.checked)}
            >
              Utilizar vigencia por defecto del requisito
            </Checkbox>
          </Form.Item>
          <Form.Item label="Fecha de Vencimiento" name="fecha_vencimiento">
            <DatePicker
              disabled={checked}
              disabledDate={(current) =>
                current && current < dayjs().endOf("day")
              }
            />
          </Form.Item>
          <Form.Item label="Cargar Certificado" name="certificado">
            <Upload {...props} maxCount={1} accept=".pdf">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
