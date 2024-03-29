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

export function DotacionUsuario({ employee }) {
  const [dotacionUsuario, setDotacionUsuario] = useState([]);
  const [dotacion, setDotacion] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = useForm();
  const [vigencia, setVigencia] = useState(0);
  const [checked, setChecked] = useState(false);

  const handleFormChange = (_, allFields) => {
    const dotaciones = dotacion.filter(
      (dotacion) => dotacion.id === allFields[0].value
    );
    setVigencia(dotaciones[0].vigencia);
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

    console.log(values);

    axios
      .post("http://localhost:5000/personal/dotacion", values)
      .then((res) => {
        message.success("Curso agregado exitosamente");
        console.log(res);
        cargarDotacionUsuario();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el curso. Error: ${err}`)
      );
    setIsModalOpen(false);
  };

  /* CARGAR TODOS LA DOTACION */
  useEffect(() => {
    axios
      .get("http://localhost:5000/dotacion")
      .then((res) => {
        setDotacion(res.data);
      })
      .catch((err) => console.log(err));
  }, []);

  /* CARGAR LA DOTACION DEL USUARIO*/
  const cargarDotacionUsuario = () => {
    axios
      .get("http://localhost:5000/personal/dotacion")
      .then((res) => {
        setDotacionUsuario(
          res.data.filter(
            (dotacion) => dotacion.trabajador === employee.trabajador
          )
        );
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    cargarDotacionUsuario();
  }, []);

  const dotacionColumns = [
    {
      title: "Nombre del elemento de dotación",
      dataIndex: "nombre_dotacion",
      key: "nombre_dotacion",
      ...GetColumnsSearchProps("nombre_dotacion"),
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_dotacion",
      key: "fecha_realizacion_dotacion",
      render: (text) => <>{moment(text).format("YYYY/MM/DD")}</>,
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_dotacion",
      key: "fecha_vencimiento_dotacion",
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
  ];

  return (
    <div>
      <Divider orientation="left">
        <h2>Dotación y Elementos</h2>
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
        Agregar Dotación al Usuario
      </Button>
      <Table dataSource={dotacionUsuario} columns={dotacionColumns} />
      <Modal
        title={"Agregar Dotación al trabajador: " + employee.trabajador}
        open={isModalOpen}
        onOk={() => {
          form.validateFields().then((values) => {
            form.resetFields();
            handleCreate(values);
            console.log(values);
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
            label="Nombre del dotacion"
            name="dotacion"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el elemento de dotacion",
              },
            ]}
          >
            <Select
              options={dotacion.map((dotacion) => {
                return { value: dotacion.id, label: dotacion.nombre };
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
        </Form>
      </Modal>
    </div>
  );
}
