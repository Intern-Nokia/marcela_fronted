import { UserAddOutlined } from "@ant-design/icons";
import {
  Button,
  DatePicker,
  Divider,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Tag,
  Typography,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GetColumnsSearchProps from "../GetColumnsSearchProps";

const lodash = require("lodash");
const { Text } = Typography;

function Employees() {
  /* Hooks */

  const [modalTitle, setModalTitle] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [dataEmployees, setDataEmployees] = useState([]);
  const [cumplimientoCursos, setCumplimientoCursos] = useState([]);
  const [cursosRequisito, setCursosRequisito] = useState([]);
  const [cumplimientoExamenes, setCumplimientoExamenes] = useState([]);
  const [examenesRequisitos, setExamenesRequisitos] = useState([]);
  const [cumplimientoDotacion, setCumplimientoDotacion] = useState([]);
  const [dotacionRequisitos, setDotacionRequisitos] = useState([]);
  const [cumplimientoOtros, setCumplimientoOtros] = useState([]);
  const [otrosRequisitos, setOtrosRequisitos] = useState([]);
  const [perfiles, setPerfiles] = useState([]);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil")
      .then((res) => setPerfiles(res.data))
      .catch((err) => console.log(err));
  }, []);

  const options = perfiles.map((perfil) => {
    return {
      label: perfil.nombre_perfil,
      value: perfil.id_perfil,
    };
  });

  //LISTA OTROS REQUISITOS POR PERFIL
  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/otros")
      .then((res) => setOtrosRequisitos(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA OTROS REQUISITOS CUMPLIDOS POR PERSONA
  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/otros")
      .then((res) => setCumplimientoOtros(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE DOTACION REQUERIDA POR PERFIL
  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/dotacion")
      .then((res) => setDotacionRequisitos(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DOTACION POR PERSONA
  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/dotacion")
      .then((res) => setCumplimientoDotacion(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE EXAMENES REQUERIDOS POR PERFIL
  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/examenes")
      .then((res) => setExamenesRequisitos(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE EXAMENES CUMPLIDOS POR PERSONA
  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/examenes")
      .then((res) => setCumplimientoExamenes(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE CURSOS REQUERIDOS POR PERFIL
  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/cursos")
      .then((res) => setCursosRequisito(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE CURSOS CUMPLIDOS POR PERSONA
  useEffect(() => {
    axios
      .get("http://localhost:5000/personal/cursos")
      .then((res) => setCumplimientoCursos(res.data))
      .catch((err) => console.log(err));
  }, []);

  //LISTA DE LAS PERSONAS CON SUS PERFILES TABLA PRINCIPAL
  useEffect(() => {
    axios
      .get("http://localhost:5000/perfil/personas")
      .then((res) => {
        setDataEmployees(res.data);
      })
      .catch((err) => console.error("Error: ", err));
  }, []);

  //MANEJO DE MODAL PARA CREACION DE PERSONAS
  const onFinishFailed = (errorInfo) => {
    message.error(
      "Error al enviar el formulario. Verifique que todos los campos obligatorios esten diligenciados."
    );
  };

  const handleCreate = (values) => {
    setSelectedEmployee({});
    const { perfiles } = values;
    values.fecha_nacimiento = moment(values.fecha_nacimiento).format(
      "YYYY/MM/DD"
    );
    delete values["perfiles"];
    axios
      .post("http://localhost:5000/personal/", values)
      .then(() => {
        message.success("Trabajador agregado exitosamente");
        setIsModalOpen(false);
      })
      .catch((err) => {
        console.log("Error ", err);
        message.error("No se pudo agregar el trabajador. Error: " + { err });
      });

    for (let i = 0; i < perfiles.length; i++) {
      let data = {
        perfil: perfiles[i],
        persona: values.CI,
      };
      axios
        .post("http://localhost:5000/perfil/personas", data)
        .then(() => console.log("Perfil agregado"))
        .catch((err) => console.log(err));
    }
    updateEmployees();
    form.resetFields();
  };

  // const handleDelete = (rut) => {
  //   axios
  //     .patch("http://localhost:5000/personal/" + rut)
  //     .then(() => {
  //       message.success("Usuario eliminado exitosamente");
  //       updateEmployees();
  //     })
  //     .catch((err) => {
  //       message.error(
  //         "Error al eliminar usuario, intente nuevamente. Error: " + { err }
  //       );
  //     });
  // };

  const updateEmployees = () => {
    axios
      .get("http://localhost:5000/perfil/personas")
      .then((res) => {
        setDataEmployees(res.data);
      })
      .catch((err) => console.error("Error", err));
  };

  const handleStatus = (record) => {
    const cursosUser = cumplimientoCursos.filter(
      (curso) => curso.CI === record.CI
    );

    const cursosPerfil = cursosRequisito.filter(
      (perfil) => perfil.id_perfil === record.id_perfil
    );

    const examenesUser = cumplimientoExamenes.filter(
      (examen) => examen.CI === record.CI
    );

    const examenesPerfil = examenesRequisitos.filter(
      (examen) => examen.id_perfil === record.id_perfil
    );

    const dotacionUser = cumplimientoDotacion.filter(
      (dotacion) => dotacion.CI === record.CI
    );

    const dotacionPerfil = dotacionRequisitos.filter(
      (dotacion) => dotacion.id_perfil === record.id_perfil
    );

    const otrosUser = cumplimientoOtros.filter((otro) => otro.CI === record.CI);

    const otrosPerfil = otrosRequisitos.filter(
      (otro) => otro.id_perfil === record.id_perfil
    );

    const cumpleCursos = [];
    const cursosRequeridos = [];
    const cumpleExamenes = [];
    const examenesRequeridos = [];
    const cumpleDotacion = [];
    const dotacionRequeridos = [];
    const cumpleOtros = [];
    const otrosRequeridos = [];

    const now = moment();
    const inAMonth = moment().add(1, "M");

    cursosUser.forEach((curso) => {
      if (now.isBefore(curso.fecha_vencimiento_curso)) {
        cumpleCursos.push(curso.id_curso);
      }
    });
    cursosPerfil.forEach((curso) => cursosRequeridos.push(curso.id_curso));

    examenesUser.forEach((examen) => {
      if (now.isBefore(examen.fecha_vencimiento_examen)) {
        cumpleExamenes.push(examen.id_examen);
      }
    });
    examenesPerfil.forEach((examen) =>
      examenesRequeridos.push(examen.id_examen)
    );

    dotacionUser.forEach((dotacion) => {
      if (now.isBefore(dotacion.fecha_vencimiento_dotacion)) {
        cumpleDotacion.push(dotacion.id_dotacion);
      }
    });
    dotacionPerfil.forEach((dotacion) =>
      dotacionRequeridos.push(dotacion.id_dotacion)
    );

    otrosUser.forEach((otro) => {
      if (now.isBefore(otro.fecha_vencimiento_otro)) {
        cumpleOtros.push(otro.id_otro);
      }
    });
    otrosPerfil.forEach((otro) => otrosRequeridos.push(otro.id_otro));

    //NO CUMPLE UN REQUISITO
    if (
      lodash.difference(cursosRequeridos, cumpleCursos).length > 0 ||
      lodash.difference(examenesRequeridos, cumpleExamenes).length > 0 ||
      lodash.difference(dotacionRequeridos, cumpleDotacion).length > 0 ||
      lodash.difference(otrosRequeridos, cumpleOtros).length > 0
    ) {
      return "NOK";
    }

    //CUMPLE CON TODOS LOS REQUISITOS PERO ESTA CERCA A VENCIMIENTO
    for (let i = 0; i < cursosRequeridos.length; i++) {
      let cursoInfo = cursosUser.filter(
        (c) => c.id_curso === cursosRequeridos[i]
      );
      if (
        moment(cursoInfo[0].fecha_vencimiento_curso).isBetween(now, inAMonth)
      ) {
        return "PENDIENTE";
      }
    }

    for (let i = 0; i < examenesRequeridos.length; i++) {
      let examenInfo = examenesUser.filter(
        (c) => c.id_examen === examenesRequeridos[i]
      );
      if (
        moment(examenInfo[0].fecha_vencimiento_examen).isBetween(now, inAMonth)
      ) {
        return "PENDIENTE";
      }
    }

    for (let i = 0; i < dotacionRequeridos.length; i++) {
      let dotacionInfo = dotacionUser.filter(
        (c) => c.id_dotacion === dotacionRequeridos[i]
      );
      if (
        moment(dotacionInfo[0].fecha_vencimiento_dotacion).isBetween(
          now,
          inAMonth
        )
      ) {
        return "PENDIENTE";
      }
    }

    for (let i = 0; i < otrosRequeridos.length; i++) {
      let otroInfo = otrosUser.filter((c) => c.id_otro === otrosRequeridos[i]);
      if (moment(otroInfo[0].fecha_vencimiento_otro).isBetween(now, inAMonth)) {
        return "PENDIENTE";
      }
    }

    //CUMPLE CON TODOS LOS REQUISITOS
    return "OK";
  };

  const columns = [
    {
      title: "Trabajador",
      dataIndex: "trabajador",
      key: "Trabajador",
      render: (text, record) => (
        <Button
          type="link"
          onClick={() => {
            navigate("infoEmployee", { state: { employee: record } });
          }}
        >
          <Text strong style={{ color: "#1677ff" }}>
            {text}
          </Text>
        </Button>
      ),
      ...GetColumnsSearchProps("trabajador"),
    },
    {
      title: "Identificación",
      dataIndex: "CI",
      key: "RUT",
      ...GetColumnsSearchProps("CI"),
    },
    {
      title: "Cliente",
      dataIndex: "cliente",
      key: "cliente",
      ...GetColumnsSearchProps("cliente"),
    },
    {
      title: "Perfil",
      dataIndex: "nombre_perfil",
      key: "nombre_perfil",
      ...GetColumnsSearchProps("nombre_perfil"),
    },
    {
      title: "Estado",
      key: "status",
      onCell: (record) => {
        return {
          onClick: () =>
            navigate("profile", {
              state: { employee: record },
            }),
        };
      },
      render: (_, record) => {
        let status = handleStatus(record);
        console.log(status);
        if (status === "OK") {
          return <Tag color="green">OK</Tag>;
        }
        if (status === "NOK") {
          return <Tag color="red">NOK</Tag>;
        }
        return <Tag color="yellow">PROXIMO A VENCER</Tag>;
      },
    },
  ];

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div>
      <Divider orientation="left">
        <h2>Información del empleado</h2>
      </Divider>

      <Button
        type="primary"
        style={{
          fontSize: "1.2rem",
          margin: "20px",
          padding: ".2rem",
          textAlign: "center",
          height: "auto",
        }}
        icon={<UserAddOutlined />}
        onClick={() => {
          setModalTitle("Agregar trabajador");
          setIsModalOpen(true);
        }}
      >
        Agregar trabajador
      </Button>

      <Table dataSource={dataEmployees} columns={columns} />

      <Modal
        title={modalTitle}
        open={isModalOpen}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              handleCreate(values);
            })
            .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          form.resetFields();
          setSelectedEmployee(null);
          setIsModalOpen(false);
        }}
      >
        <Form
          form={form}
          layout="vertical"
          initialValues={selectedEmployee}
          autoComplete="off"
        >
          <Form.Item
            label="Tipo de identificación"
            name="tipo_identificacion"
            rules={[
              {
                required: true,
                message: "Por favor seleccione el tipo de identificación",
              },
            ]}
          >
            <Select
              options={[
                {
                  value: "RUT",
                  label: "RUT",
                },
                {
                  value: "PASAPORTE",
                  label: "PASAPORTE",
                },
              ]}
            />
          </Form.Item>
          <Form.Item
            label="No. de Identificación"
            name="CI"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el RUT del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Empresa"
            name="empresa"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la Empresa del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre completo"
            name="trabajador"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Nombre del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cargo"
            name="cargo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Cargo del trabajador",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Nacionalidad" name="nacionalidad">
            <Input />
          </Form.Item>
          <Form.Item
            label="Fecha de Nacimiento"
            name="fecha_nacimiento"
            rules={[
              {
                required: true,
                message:
                  "Por favor ingrese la fecha de nacimiento del trabajador",
              },
            ]}
          >
            <DatePicker
              disabledDate={(current) =>
                current && current > dayjs().endOf("day")
              }
            />
          </Form.Item>
          <Form.Item
            label="Correo Electrónico"
            name="correo"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Número de teléfono" name="telefono">
            <Input />
          </Form.Item>
          <Form.Item
            label="Fecha de vencimiento de CI"
            name="fecha_vencimiento_CI"
          >
            <DatePicker />
          </Form.Item>
          <Form.Item label="Vigencia Visa" name="vigencia_visa">
            <DatePicker />
          </Form.Item>
          {/* <Form.Item label="Proyecto Actual" name="proyectoActual">
            <Input />
          </Form.Item> */}
          <Form.Item
            label="Correo Personal"
            name="correo_personal"
            rules={[
              {
                type: "email",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Inicio de Contrato" name="inicio_contrato">
            <DatePicker />
          </Form.Item>
          <Form.Item label="Dirección" name="direccion">
            <Input />
          </Form.Item>
          <Form.Item label="Comuna" name="comuna">
            <Input />
          </Form.Item>
          <Form.Item label="Ciudad" name="ciudad">
            <Input />
          </Form.Item>
          <Form.Item name="estado_civil" label="Estado Civil">
            <Select
              options={[
                {
                  value: "Soltero",
                },
                {
                  value: "Casado",
                },
                {
                  value: "Viudo",
                },
                {
                  value: "Union Libre",
                },
              ]}
            ></Select>
          </Form.Item>
          <Form.Item name="perfiles" label="Perfiles del trabajador">
            <Select mode="multiple" allowClear options={options} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Employees;
