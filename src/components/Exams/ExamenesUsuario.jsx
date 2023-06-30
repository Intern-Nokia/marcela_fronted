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
import dayjs from "dayjs";
import moment from "moment";
import { useEffect, useState } from "react";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

export function ExamenesUsuario({ employee }) {
  const [examenUsuario, setExamenUsuario] = useState([]);
  const [examenes, setExamenes] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vigencia, setVigencia] = useState(0);
  const [checked, setChecked] = useState(false);
  const [form] = useForm();

  const handleFormChange = (_, allFields) => {
    const examen = examenes.filter(
      (examen) => examen.id === allFields[0].value
    );
    setVigencia(examen[0].vigencia);
  };

  const handleCreate = (values) => {
    values["persona"] = employee.CI;
    values.fecha_presentacion = values.fecha_presentacion.format("YYYY/MM/DD");

    if (values.fecha_vencimiento === undefined) {
      const vencimiento = moment(values.fecha_presentacion);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento = values.fecha_vencimiento.format("YYYY/MM/DD");
    }

    axios
      .post("http://localhost:5000/personal/examenes", values)
      .then((res) => {
        message.success("Curso agregado exitosamente");
        console.log(res);
        cargarExamenesUsuario();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el curso. Error: ${err}`)
      );
    setIsModalOpen(false);
  };

  /* CARGAR TODOS LOS EXAMENES */
  const cargarExamenes = () => {
    axios
      .get("http://localhost:5000/examenes")
      .then((res) => {
        setExamenes(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarExamenes();
  }, []);

  /* CARGAR LOS EXAMENES DEL USUARIO*/
  const cargarExamenesUsuario = () => {
    axios
      .get("http://localhost:5000/personal/examenes")
      .then((res) => {
        setExamenUsuario(
          res.data.filter((examen) => examen.trabajador === employee.trabajador)
        );
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    cargarExamenesUsuario();
  }, []);

  const examenColumns = [
    {
      title: "Nombre del Exámen",
      dataIndex: "nombre_examen",
      key: "nombre_examen",
      ...GetColumnsSearchProps("nombre_examen"),
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_examen",
      key: "fecha_realizacion_examen",
      render: (text) => <>{moment(text).format("YYYY/MM/DD")}</>,
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_examen",
      key: "fecha_vencimiento_examen",
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
      dataIndex: "url_certificado",
      key: "url_certificado_examen",
      render: () => (
        <a
          href="https://africau.edu/images/default/sample.pdf"
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

  const props = {
    name: "file",
    action: "http://localhost:5000/upload",
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div>
      <Divider orientation="left">
        <h2>Exámenes</h2>
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
        Agregar Exámen al Usuario
      </Button>
      <Table dataSource={examenUsuario} columns={examenColumns} />
      <Modal
        title={"Agregar Exámen al trabajador: " + employee.trabajador}
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
            label="Nombre del exámen"
            name="examen"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el exámen",
              },
            ]}
          >
            <Select
              options={examenes.map((examen) => {
                return { value: examen.id, label: examen.nombre };
              })}
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
            <DatePicker />
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
          <Form.Item label="Cargar Certificado">
            <Upload {...props} maxCount={1} accept=".pdf">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
