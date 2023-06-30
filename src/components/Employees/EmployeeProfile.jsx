import { FilePdfTwoTone, UploadOutlined } from "@ant-design/icons";
import {
  Button,
  Checkbox,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Table,
  Tag,
  Typography,
  Upload,
  message,
} from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import moment from "moment/moment";
import { useForm } from "antd/es/form/Form";
import { props } from "../Requests/Upload";
import dayjs from "dayjs";

const { Text } = Typography;

export function EmployeeProfile() {
  const location = useLocation();
  const employee = location.state.employee;

  /* CUMPLIMIENTO CURSOS Vs. REQUISITOS CURSOS */
  const [cursosUsuario, setCursosUsuario] = useState([]);
  const [cursosPerfil, setCursosPerfil] = useState([]);
  const [openCurso, setOpenCurso] = useState(false);
  const [openExamen, setOpenExamen] = useState(false);
  const [openDotacion, setOpenDotacion] = useState(false);
  const [openOtro, setOpenOtro] = useState(false);
  const [nombreRequisito, setNombreRequisito] = useState("");
  const [idRequisito, setIDRequisito] = useState(0);
  const [checked, setChecked] = useState(true);

  const [formCurso] = useForm();
  const [formExamen] = useForm();
  const [formDotacion] = useForm();
  const [formOtro] = useForm();
  const [vigencia, setVigencia] = useState(0);

  const handleCreateOtro = (values) => {
    values["persona"] = employee.CI;
    values["otro"] = idRequisito;

    values.fecha_presentacion_otro =
      values.fecha_presentacion_otro.format("YYYY/MM/DD");

    if (values.fecha_vencimiento_otro === undefined) {
      const vencimiento = moment(values.fecha_presentacion_otro);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento_otro = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento_otro =
        values.fecha_vencimiento_otro.format("YYYY/MM/DD");
    }
    values["fecha_vencimiento"] = values.fecha_vencimiento_otro;
    values["fecha_presentacion"] = values.fecha_presentacion_otro;

    delete values["fecha_vencimiento_otro"];
    delete values["fecha_presentacion_otro"];

    // console.log(values, vigencia);
    axios
      .post("http://localhost:5000/personal/otros", values)
      .then((res) => {
        message.success("Otro requisito agregado exitosamente", 2000);
        window.location.reload();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el examen. Error: ${err}`)
      );
    setOpenOtro(false);
  };

  const handleCreateDotacion = (values) => {
    values["persona"] = employee.CI;
    values["dotacion"] = idRequisito;

    values.fecha_presentacion_dotacion =
      values.fecha_presentacion_dotacion.format("YYYY/MM/DD");

    if (values.fecha_vencimiento_dotacion === undefined) {
      const vencimiento = moment(values.fecha_presentacion_dotacion);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento_dotacion = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento_dotacion =
        values.fecha_vencimiento_dotacion.format("YYYY/MM/DD");
    }
    values["fecha_vencimiento"] = values.fecha_vencimiento_dotacion;
    values["fecha_presentacion"] = values.fecha_presentacion_dotacion;

    delete values["fecha_vencimiento_dotacion"];
    delete values["fecha_presentacion_dotacion"];

    // console.log(values, vigencia);
    axios
      .post("http://localhost:5000/personal/dotacion", values)
      .then((res) => {
        message.success("Dotacion agregado exitosamente", 2000);
        window.location.reload();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el examen. Error: ${err}`)
      );
    setOpenDotacion(false);
  };

  const handleCreateExamen = (values) => {
    values["persona"] = employee.CI;
    values["examen"] = idRequisito;

    values.fecha_presentacion_examen =
      values.fecha_presentacion_examen.format("YYYY/MM/DD");

    if (values.fecha_vencimiento_examen === undefined) {
      const vencimiento = moment(values.fecha_presentacion_examen);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento_examen = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento_examen =
        values.fecha_vencimiento_examen.format("YYYY/MM/DD");
    }
    values["fecha_vencimiento"] = values.fecha_vencimiento_examen;
    values["fecha_presentacion"] = values.fecha_presentacion_examen;

    delete values["fecha_vencimiento_examen"];
    delete values["fecha_presentacion_examen"];

    // console.log(values);
    axios
      .post("http://localhost:5000/personal/examenes", values)
      .then((res) => {
        message.success("Curso agregado exitosamente", 2000);
        window.location.reload();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el examen. Error: ${err}`)
      );
    setOpenCurso(false);
  };

  const handleCreateCurso = (values) => {
    values["persona"] = employee.CI;
    values["curso"] = idRequisito;

    values.fecha_presentacion_curso =
      values.fecha_presentacion_curso.format("YYYY/MM/DD");

    if (values.fecha_vencimiento_curso === undefined) {
      const vencimiento = moment(values.fecha_presentacion_curso);
      vencimiento.add(vigencia, "months");
      values.fecha_vencimiento_curso = vencimiento.format("YYYY/MM/DD");
    } else {
      values.fecha_vencimiento_curso =
        values.fecha_vencimiento_curso.format("YYYY/MM/DD");
    }
    values["fecha_vencimiento"] = values.fecha_vencimiento_curso;
    values["fecha_presentacion"] = values.fecha_presentacion_curso;

    delete values["fecha_vencimiento_curso"];
    delete values["fecha_presentacion_curso"];

    axios
      .post("http://localhost:5000/personal/cursos", values)
      .then((res) => {
        message.success("Curso agregado exitosamente", 2000);
        window.location.reload();
      })
      .catch((err) =>
        message.error(`No se pudo agregar el curso. Error: ${err}`)
      );
    setOpenCurso(false);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/cursos")
      .then((res) => setCursosPerfil(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/cursos")
      .then((res) => setCursosUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const statusColumn = (text) => {
    const now = moment();
    const inAMonth = moment().add(1, "M");

    if (moment(text).isBetween(now, inAMonth)) {
      return (
        <>
          <Text type="warning" strong>
            {moment(text).format("YYYY/MM/DD")}
          </Text>{" "}
          <Tag color="yellow">PROXIMO A VENCER</Tag>
        </>
      );
    }
    if (now.isBefore(moment(text))) {
      return (
        <>
          <Text type="success" strong>
            {moment(text).format("YYYY/MM/DD")}
          </Text>{" "}
          <Tag color="green">VIGENTE</Tag>
        </>
      );
    }

    return (
      <>
        <Tag color="red">NO TIENE O VENCIDO</Tag>
      </>
    );
  };

  const now = moment();

  const cursosEmpleado = cursosUsuario.filter(
    (curso) =>
      curso.trabajador === employee.trabajador &&
      moment(curso.fecha_vencimiento_curso) > now
  );

  console.log(cursosEmpleado);

  const cursosRequisito = cursosPerfil.filter(
    (curso) => curso.id_perfil === employee.id_perfil
  );

  const cursosRequisitoVsEmpleado = [];

  const cursosEmpleadoLista = cursosEmpleado.map((curso) => curso.nombre_curso);

  cursosRequisito.forEach((cursoRequerido) => {
    if (cursosEmpleadoLista.includes(cursoRequerido.nombre_curso)) {
      const empleadoCumple = cursosEmpleado.find(
        ({ nombre_curso }) => nombre_curso === cursoRequerido.nombre_curso
      );
      let now = moment();
      if (now.isBefore(empleadoCumple.fecha_vencimiento_curso)) {
        empleadoCumple["status"] = "Cumple";
      } else {
        empleadoCumple["status"] = "Vencido";
      }
      cursosRequisitoVsEmpleado.push(empleadoCumple);
    } else {
      cursosRequisitoVsEmpleado.push({
        id_curso: cursoRequerido.id_curso,
        nombre_curso: cursoRequerido.nombre_curso,
        vigencia_curso: cursoRequerido.vigencia_curso,
        status: "No cumple",
      });
    }
  });

  const cursoColumns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre_curso",
      key: "nombre_curso",
      render: (text, record) => {
        return <Text strong>{text}</Text>;
      },
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_curso",
      key: "fecha_realizacion_curso",
      render: (text, record) => {
        if (record.status === "No cumple") {
          return <Tag color="red">NO TIENE O VENCIDO</Tag>;
        } else {
          return <>{moment(text).format("YYYY/MM/DD")}</>;
        }
      },
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_curso",
      key: "fecha_vencimiento_curso",
      render: (text, record) => {
        return statusColumn(text);
      },
    },
    {
      title: "Certificado",
      dataIndex: "certificado_curso",
      key: "certificado_curso",
      render: (_, record) => {
        if (record.status === "Cumple") {
          return (
            <a
              href="https://africau.edu/images/default/sample.pdf"
              target="_blank"
              style={{ fontSize: "32px" }}
            >
              <FilePdfTwoTone twoToneColor="#eb2f96" />
            </a>
          );
        } else {
          return (
            <Button
              type="dashed"
              size="small"
              onClick={() => {
                setNombreRequisito(record.nombre_curso);
                setVigencia(record.vigencia_curso);
                setIDRequisito(record.id_curso);
                setOpenCurso(true);
              }}
            >
              Añadir Curso
            </Button>
          );
        }
      },
    },
  ];

  /*CUMPLIMIENTO EXAMENES Vs. REQUISITOS EXAMENES */

  const [examenesUsuario, setexamenesUsuario] = useState([]);
  const [examenesPerfil, setexamenesPerfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/examenes")
      .then((res) => setexamenesPerfil(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/examenes")
      .then((res) => setexamenesUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const examenesEmpleado = examenesUsuario.filter(
    (examen) =>
      examen.trabajador === employee.trabajador &&
      moment(examen.fecha_vencimiento_examen) > now
  );

  const examenesRequisito = examenesPerfil.filter(
    (examen) => examen.id_perfil === employee.id_perfil
  );

  const examenesRequisitoVsEmpleado = [];

  const examenesEmpleadoLista = examenesEmpleado.map(
    (examen) => examen.nombre_examen
  );

  examenesRequisito.forEach((examenRequerido) => {
    if (examenesEmpleadoLista.includes(examenRequerido.nombre_examen)) {
      const empleadoCumple = examenesEmpleado.find(
        ({ nombre_examen }) => nombre_examen === examenRequerido.nombre_examen
      );
      let now = moment();
      if (now.isBefore(empleadoCumple.fecha_vencimiento_examen)) {
        empleadoCumple["status"] = "Cumple";
      } else {
        empleadoCumple["status"] = "Vencido";
      }
      examenesRequisitoVsEmpleado.push(empleadoCumple);
    } else {
      examenesRequisitoVsEmpleado.push({
        id_examen: examenRequerido.id_examen,
        nombre_examen: examenRequerido.nombre_examen,
        vigencia_examen: examenRequerido.vigencia_examen,
        status: "No cumple",
      });
    }
  });

  const examenesColumns = [
    {
      title: "Nombre del examen",
      dataIndex: "nombre_examen",
      key: "nombre_examen",
      render: (text, record) => {
        return <Text strong>{text}</Text>;
      },
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_examen",
      key: "fecha_realizacion_examen",
      render: (text, record) => {
        if (record.status === "No cumple") {
          return <Tag color="red">NO TIENE O VENCIDO</Tag>;
        }
        return <>{moment(text).format("YYYY/MM/DD")}</>;
      },
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_examen",
      key: "fecha_vencimiento_examen",
      render: (text) => {
        return statusColumn(text);
      },
    },
    {
      title: "Certificado",
      dataIndex: "certificado_examen",
      key: "certificado_examen",
      render: (_, record) => {
        if (record.status === "Cumple") {
          return (
            <a
              href="https://africau.edu/images/default/sample.pdf"
              target="_blank"
              style={{ fontSize: "32px" }}
            >
              <FilePdfTwoTone twoToneColor="#eb2f96" />
            </a>
          );
        } else {
          return (
            <Button
              type="dashed"
              size="small"
              onClick={() => {
                setIDRequisito(record.id_examen);
                setNombreRequisito(record.nombre_examen);
                setVigencia(record.vigencia_examen);
                setOpenExamen(true);
              }}
            >
              Añadir examen
            </Button>
          );
        }
      },
    },
  ];

  /*CUMPLIMIENTO DOTACION Vs. REQUISITOS DOTACION */

  const [dotacionUsuario, setdotacionUsuario] = useState([]);
  const [dotacionPerfil, setdotacionPerfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/dotacion")
      .then((res) => setdotacionPerfil(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/dotacion")
      .then((res) => setdotacionUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const dotacionEmpleado = dotacionUsuario.filter(
    (dotacion) =>
      dotacion.trabajador === employee.trabajador &&
      moment(dotacion.fecha_vencimiento_dotacion) > now
  );

  const dotacionRequisito = dotacionPerfil.filter(
    (dotacion) => dotacion.id_perfil === employee.id_perfil
  );

  const dotacionRequisitoVsEmpleado = [];

  const dotacionEmpleadoLista = dotacionEmpleado.map(
    (dotacion) => dotacion.nombre_dotacion
  );

  dotacionRequisito.forEach((dotacionRequerido) => {
    if (dotacionEmpleadoLista.includes(dotacionRequerido.nombre_dotacion)) {
      const empleadoCumple = dotacionEmpleado.find(
        ({ nombre_dotacion }) =>
          nombre_dotacion === dotacionRequerido.nombre_dotacion
      );
      let now = moment();
      if (now.isBefore(empleadoCumple.fecha_vencimiento_dotacion)) {
        empleadoCumple["status"] = "Cumple";
      } else {
        empleadoCumple["status"] = "Vencido";
      }
      dotacionRequisitoVsEmpleado.push(empleadoCumple);
    } else {
      dotacionRequisitoVsEmpleado.push({
        id_dotacion: dotacionRequerido.id_dotacion,
        vigencia_dotacion: dotacionRequerido.vigencia_dotacion,
        nombre_dotacion: dotacionRequerido.nombre_dotacion,
        status: "No cumple",
      });
    }
  });

  const dotacionColumns = [
    {
      title: "Nombre del elemento de dotación",
      dataIndex: "nombre_dotacion",
      key: "nombre_dotacion",
      render: (text, record) => {
        return <Text strong>{text}</Text>;
      },
    },
    {
      title: "Fecha de Entrega",
      dataIndex: "fecha_realizacion_dotacion",
      key: "fecha_realizacion_dotacion",
      render: (text, record) => {
        if (record.status === "No cumple") {
          return <Tag color="red">NO TIENE O VENCIDO</Tag>;
        }
        return <>{moment(text).format("YYYY/MM/DD")}</>;
      },
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_dotacion",
      key: "fecha_vencimiento_dotacion",
      render: (text) => {
        return statusColumn(text);
      },
    },
    {
      title: "Certificado",
      dataIndex: "certificado_dotacion",
      key: "certificado_dotacion",
      render: (_, record) => {
        if (record.status === "Cumple") {
          return (
            <a
              href="https://africau.edu/images/default/sample.pdf"
              target="_blank"
              style={{ fontSize: "32px" }}
            >
              <FilePdfTwoTone twoToneColor="#eb2f96" />
            </a>
          );
        } else {
          return (
            <Button
              type="dashed"
              size="small"
              onClick={() => {
                setNombreRequisito(record.nombre_dotacion);
                setIDRequisito(record.id_dotacion);
                setVigencia(record.vigencia_dotacion);
                setOpenDotacion(true);
              }}
            >
              Añadir dotacion
            </Button>
          );
        }
      },
    },
  ];

  /*CUMPLIMIENTO EXAMENES Vs. REQUISITOS EXAMENES */

  const [otrosUsuario, setotrosUsuario] = useState([]);
  const [otrosPerfil, setotrosPerfil] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/otros")
      .then((res) => setotrosPerfil(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/otros")
      .then((res) => setotrosUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  const otrosEmpleado = otrosUsuario.filter(
    (otro) =>
      otro.trabajador === employee.trabajador &&
      moment(otro.fecha_vencimiento_otro) > now
  );

  const otrosRequisito = otrosPerfil.filter(
    (otro) => otro.id_perfil === employee.id_perfil
  );

  const otrosRequisitoVsEmpleado = [];

  const otrosEmpleadoLista = otrosEmpleado.map((otro) => otro.nombre_otro);

  otrosRequisito.forEach((otroRequerido) => {
    if (otrosEmpleadoLista.includes(otroRequerido.nombre_otro)) {
      const empleadoCumple = otrosEmpleado.find(
        ({ nombre_otro }) => nombre_otro === otroRequerido.nombre_otro
      );
      let now = moment();
      if (now.isBefore(empleadoCumple.fecha_vencimiento_otro)) {
        empleadoCumple["status"] = "Cumple";
      } else {
        empleadoCumple["status"] = "Vencido";
      }
      otrosRequisitoVsEmpleado.push(empleadoCumple);
    } else {
      otrosRequisitoVsEmpleado.push({
        id_otro: otroRequerido.id_otro,
        nombre_otro: otroRequerido.nombre_otro,
        vigencia_otro: otroRequerido.vigencia_otro,
        status: "No cumple",
      });
    }
  });

  const otrosColumns = [
    {
      title: "Nombre del otro",
      dataIndex: "nombre_otro",
      key: "nombre_otro",
      render: (text, record) => {
        return <Text strong>{text}</Text>;
      },
    },
    {
      title: "Fecha de Realización",
      dataIndex: "fecha_realizacion_otro",
      key: "fecha_realizacion_otro",
      render: (text, record) => {
        if (record.status === "No cumple") {
          return <Tag color="red">NO TIENE O VENCIDO</Tag>;
        }
        return <>{moment(text).format("YYYY/MM/DD")}</>;
      },
    },
    {
      title: "Fecha de Vencimiento",
      dataIndex: "fecha_vencimiento_otro",
      key: "fecha_vencimiento_otro",
      render: (text) => {
        return statusColumn(text);
      },
    },
    {
      title: "Certificado",
      dataIndex: "certificado_otro",
      key: "certificado_otro",
      render: (_, record) => {
        if (record.status === "Cumple") {
          return (
            <a
              href="https://africau.edu/images/default/sample.pdf"
              target="_blank"
              style={{ fontSize: "32px" }}
            >
              <FilePdfTwoTone twoToneColor="#eb2f96" />
            </a>
          );
        } else {
          return (
            <Button
              type="dashed"
              size="small"
              onClick={() => {
                setIDRequisito(record.id_otro);
                setNombreRequisito(record.nombre_otro);
                setVigencia(record.vigencia_otro);
                setOpenOtro(true);
              }}
            >
              Añadir otro
            </Button>
          );
        }
      },
    },
  ];

  return (
    <div>
      <h1>
        Cumplimiento de Requisitos del perfil{" "}
        <a>
          {employee.cliente} : {employee.nombre_perfil} ({employee.trabajador})
        </a>{" "}
      </h1>
      {/**********************************CURSOS **************************** */}
      <Divider orientation="left">
        <h2>Cursos</h2>
      </Divider>
      <Table dataSource={cursosRequisitoVsEmpleado} columns={cursoColumns} />
      <Modal
        destroyOnClose
        centered
        title={
          <div>
            <Text style={{ fontSize: 20 }} type="secondary">
              Añadir curso:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {nombreRequisito}
            </Text>
            <br />
            <Text style={{ fontSize: 20 }} type="secondary">
              Al trabajador:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {employee.trabajador}
            </Text>
          </div>
        }
        open={openCurso}
        onOk={() => {
          formCurso.validateFields().then((values) => {
            formCurso.resetFields();
            handleCreateCurso(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          formCurso.resetFields();
          setOpenCurso(false);
        }}
      >
        <Form form={formCurso} layout="vertical">
          <Form.Item
            label="Fecha de Realización"
            name="fecha_presentacion_curso"
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

          <Form.Item
            label="Fecha de vencimiento"
            name="fecha_vencimiento_curso"
          >
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
      {/*****************************EXAMENES ***************************** */}
      <Divider orientation="left">
        <h2>Exámenes</h2>
      </Divider>
      <Table
        dataSource={examenesRequisitoVsEmpleado}
        columns={examenesColumns}
      />
      <Modal
        destroyOnClose
        centered
        title={
          <div>
            <Text style={{ fontSize: 20 }} type="secondary">
              Añadir Exámen:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {nombreRequisito}
            </Text>
            <br />
            <Text style={{ fontSize: 20 }} type="secondary">
              Al trabajador:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {employee.trabajador}
            </Text>
          </div>
        }
        open={openExamen}
        onOk={() => {
          formExamen.validateFields().then((values) => {
            formExamen.resetFields();
            handleCreateExamen(values);
          });
        }}
        onCancel={() => {
          formExamen.resetFields();
          setOpenExamen(false);
        }}
      >
        <Form form={formExamen} layout="vertical">
          <Form.Item
            label="Fecha de Realización"
            name="fecha_presentacion_examen"
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
          <Form.Item
            label="Fecha de Vencimiento"
            name="fecha_vencimiento_examen"
          >
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
      {/*******************************************DOTACION ***************** */}
      <Divider orientation="left">
        <h2>Dotación</h2>
      </Divider>
      <Table
        dataSource={dotacionRequisitoVsEmpleado}
        columns={dotacionColumns}
      />
      <Modal
        destroyOnClose
        centered
        title={
          <div>
            <Text style={{ fontSize: 20 }} type="secondary">
              Añadir Exámen:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {nombreRequisito}
            </Text>
            <br />
            <Text style={{ fontSize: 20 }} type="secondary">
              Al trabajador:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {employee.trabajador}
            </Text>
          </div>
        }
        open={openDotacion}
        onOk={() => {
          formDotacion.validateFields().then((values) => {
            formDotacion.resetFields();
            handleCreateDotacion(values);
          });
        }}
        onCancel={() => {
          formDotacion.resetFields();
          setOpenDotacion(false);
        }}
      >
        <Form form={formDotacion} layout="vertical">
          <Form.Item
            label="Fecha de Realización"
            name="fecha_presentacion_dotacion"
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
          <Form.Item
            label="Fecha de Vencimiento"
            name="fecha_vencimiento_dotacion"
          >
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
      {/***************************************OTROS REQUISITOS************* */}
      <Divider orientation="left">
        <h2>Otros Requisitos</h2>
      </Divider>
      <Table dataSource={otrosRequisitoVsEmpleado} columns={otrosColumns} />
      <Modal
        destroyOnClose
        centered
        title={
          <div>
            <Text style={{ fontSize: 20 }} type="secondary">
              Añadir Otro Requisito:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {nombreRequisito}
            </Text>
            <br />
            <Text style={{ fontSize: 20 }} type="secondary">
              Al trabajador:{" "}
            </Text>
            <Text style={{ fontSize: 20 }} strong>
              {employee.trabajador}
            </Text>
          </div>
        }
        open={openOtro}
        onOk={() => {
          formOtro.validateFields().then((values) => {
            formOtro.resetFields();
            handleCreateOtro(values);
          });
        }}
        onCancel={() => {
          formOtro.resetFields();
          setOpenOtro(false);
        }}
      >
        <Form form={formOtro} layout="vertical">
          <Form.Item
            label="Fecha de Realización"
            name="fecha_presentacion_otro"
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
          <Form.Item label="Fecha de Vencimiento" name="fecha_vencimiento_otro">
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
