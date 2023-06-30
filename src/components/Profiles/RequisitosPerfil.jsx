import { Button, Divider, Form, Modal, Select, Table, message } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { asignacionCursos, cursos } from "../Requests/CursosRequests";
import { asignacionExamenes, examenes } from "../Requests/ExamenesRequests";
import { asignacionDotacion, dotacion } from "../Requests/DotacionRequests";
import { asignacionOtros, otros } from "../Requests/OtrosRequests";
import { PlusCircleOutlined } from "@ant-design/icons";
import { useForm } from "antd/es/form/Form";
import {
  asignarCursoPerfil,
  asignarDotacionPerfil,
  asignarExamenPerfil,
  asignarOtroPerfil,
} from "../Requests/AsignacionesRequests";

export function RequisitosPerfil() {
  const location = useLocation();
  const perfil = location.state?.perfil;

  const [dataCursos, setDataCursos] = useState([]);
  const [dataExamenes, setDataExamenes] = useState([]);
  const [dataDotacion, setDataDotacion] = useState([]);
  const [dataOtros, setDataOtros] = useState([]);

  const [dataCursosAsignados, setDataCursosAsignados] = useState([]);
  const [dataExamenesAsignados, setDataExamenesAsignados] = useState([]);
  const [dataDotacionAsignados, setDataDotacionAsignados] = useState([]);
  const [dataOtrosAsignados, setDataOtrosAsignados] = useState([]);
  const [openCursos, setOpenCursos] = useState(false);
  const [openExamenes, setOpenExamenes] = useState(false);
  const [openDotacion, setOpenDotacion] = useState(false);
  const [openOtros, setOpenOtros] = useState(false);

  const [formCursos] = useForm();
  const [formExamenes] = useForm();
  const [formDotacion] = useForm();
  const [formOtros] = useForm();

  const handleCreateCurso = async (values) => {
    const { cursos } = values;
    for (let i = 0; i < cursos.length; i++) {
      const data = {
        curso: cursos[i],
        perfil: perfil.id_perfil,
      };
      try {
        await asignarCursoPerfil(data);
        message.success("Requisito añadido exitosamente");
        getAsignacionCursos();
      } catch (err) {
        console.log(err);
        message.error(`Error: ${err.response.data.error}`);
      }
    }
    setOpenCursos(false);
  };

  const handleCreateExamen = async (values) => {
    const { examenes } = values;
    for (let i = 0; i < examenes.length; i++) {
      const data = {
        examen: examenes[i],
        perfil: perfil.id_perfil,
      };
      try {
        await asignarExamenPerfil(data);
        message.success("Requisito añadido exitosamente");
        getAsignacionExamenes();
      } catch (err) {
        console.log(err);
        message.error(`Error: ${err.response.data.error}`);
      }
    }
    setOpenExamenes(false);
  };

  const handleCreateDotacion = async (values) => {
    const { dotaciones } = values;
    console.log(values);
    for (let i = 0; i < dotaciones.length; i++) {
      const data = {
        dotacion: dotaciones[i],
        perfil: perfil.id_perfil,
      };
      try {
        await asignarDotacionPerfil(data);
        message.success("Requisito añadido exitosamente");
        getAsignacionDotacion();
      } catch (err) {
        console.log(err);
        message.error(`Error: ${err.response.data.error}`);
      }
    }
    setOpenDotacion(false);
  };

  const handleCreateOtro = async (values) => {
    const { otros } = values;
    console.log(values);
    for (let i = 0; i < otros.length; i++) {
      const data = {
        otro: otros[i],
        perfil: perfil.id_perfil,
      };
      try {
        await asignarOtroPerfil(data);
        message.success("Requisito añadido exitosamente");
        getAsignacionOtros();
      } catch (err) {
        console.log(err);
        message.error(`Error: ${err.response.data.error}`);
      }
    }
    setOpenOtros(false);
  };

  //CURSOS
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

  const getAsignacionCursos = async () => {
    try {
      const result = await asignacionCursos();
      setDataCursosAsignados(
        result.filter((curso) => curso.id_perfil === perfil.id_perfil)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsignacionCursos();
  }, []);

  //EXAMENES
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

  const getAsignacionExamenes = async () => {
    try {
      const result = await asignacionExamenes();
      setDataExamenesAsignados(
        result.filter((examen) => examen.id_perfil === perfil.id_perfil)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsignacionExamenes();
  }, []);

  //DOTACION
  const getDotacion = async () => {
    try {
      const result = await dotacion();
      setDataDotacion(result);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getDotacion();
  }, []);

  const getAsignacionDotacion = async () => {
    try {
      const result = await asignacionDotacion();
      setDataDotacionAsignados(
        result.filter((dotacion) => dotacion.id_perfil === perfil.id_perfil)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsignacionDotacion();
  }, []);

  //OTROS
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

  const getAsignacionOtros = async () => {
    try {
      const result = await asignacionOtros();
      setDataOtrosAsignados(
        result.filter((otro) => otro.id_perfil === perfil.id_perfil)
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAsignacionOtros();
  }, []);

  const cursosColumns = [
    {
      title: "Nombre del curso",
      dataIndex: "nombre_curso",
      key: "nombre_curso",
    },
    {
      title: "Institución",
      dataIndex: "institucion_curso",
      key: "institucion_curso",
    },
    {
      title: "Modalidad",
      dataIndex: "modalidad",
      key: "modalidad",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia_curso",
      key: "vigencia_curso",
      render: (text) => <div>{text} meses</div>,
    },
    {
      title: "Costo",
      dataIndex: "costo_curso",
      key: "costo_curso",
      render: (text) => <>${text}</>,
    },
  ];

  const examenesColumns = [
    {
      title: "Nombre del Exámen",
      dataIndex: "nombre_examen",
      key: "nombre_examen",
    },
    {
      title: "Institución",
      dataIndex: "institucion_examen",
      key: "institucion_examen",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia_examen",
      key: "vigencia_examen",
      render: (text) => <div>{text} meses</div>,
    },
    {
      title: "Costo",
      dataIndex: "costo_examen",
      key: "costo_examen",
      render: (text) => <>${text}</>,
    },
  ];

  const dotacionColumns = [
    {
      title: "Nombre dotación",
      dataIndex: "nombre_dotacion",
      key: "nombre_dotacion",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia_dotacion",
      key: "vigencia_dotacion",
      render: (text) => <div>{text} meses</div>,
    },
    {
      title: "Costo",
      dataIndex: "costo_dotacion",
      key: "costo_dotacion",
      render: (text) => <>${text}</>,
    },
  ];

  const otrosColumns = [
    {
      title: "Nombre otro requisito",
      dataIndex: "nombre_otro",
      key: "nombre_otro",
    },
    {
      title: "Vigencia",
      dataIndex: "vigencia_otro",
      key: "vigencia_otro",
      render: (text) => <div>{text} meses</div>,
    },
    {
      title: "Costo",
      dataIndex: "costo_otro",
      key: "costo_otro",
      render: (text) => <>${text}</>,
    },
  ];

  return (
    <>
      <h1>
        Requisitos perfil{" "}
        <span style={{ color: "#808080" }}>
          {perfil.proyecto} : {perfil.nombre_perfil}
        </span>
      </h1>
      <Divider orientation="left">
        <h2>Cursos</h2>
      </Divider>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        style={{ fontSize: 20, padding: 10, height: "auto", marginBottom: 25 }}
        onClick={() => setOpenCursos(true)}
      >
        Agregar Curso Requisito al Perfil
      </Button>
      <Table dataSource={dataCursosAsignados} columns={cursosColumns} />

      <Modal
        width="70%"
        centered
        title={"Agregar Requisitos al perfil: " + perfil.nombre_perfil}
        open={openCursos}
        onOk={() => {
          formCursos.validateFields().then((values) => {
            formCursos.resetFields();
            handleCreateCurso(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          formCursos.resetFields();
          setOpenCursos(false);
        }}
      >
        <Form form={formCursos} layout="vertical">
          <Form.Item
            label="Seleccione los cursos"
            name="cursos"
            rules={[
              {
                required: true,
                message: "Por favor seleccione los curso",
              },
            ]}
          >
            <Select
              style={{ marginBottom: 50 }}
              mode="multiple"
              options={dataCursos.map((curso) => {
                return {
                  label: curso.nombre,
                  value: curso.id,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Divider orientation="left">
        <h2>Exámenes</h2>
      </Divider>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        style={{ fontSize: 20, padding: 10, height: "auto", marginBottom: 25 }}
        onClick={() => setOpenExamenes(true)}
      >
        Agregar Exámen Requisito al Perfil
      </Button>
      <Table dataSource={dataExamenesAsignados} columns={examenesColumns} />

      <Modal
        width="70%"
        centered
        title={"Agregar Requisitos al perfil: " + perfil.nombre_perfil}
        open={openExamenes}
        onOk={() => {
          formExamenes.validateFields().then((values) => {
            formExamenes.resetFields();
            handleCreateExamen(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          formExamenes.resetFields();
          setOpenExamenes(false);
        }}
      >
        <Form form={formExamenes} layout="vertical">
          <Form.Item
            label="Seleccione los examenes"
            name="examenes"
            rules={[
              {
                required: true,
                message: "Por favor seleccione los examenes",
              },
            ]}
          >
            <Select
              style={{ marginBottom: 50 }}
              mode="multiple"
              options={dataExamenes.map((examen) => {
                return {
                  label: examen.nombre,
                  value: examen.id,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Divider orientation="left">
        <h2>Dotación</h2>
      </Divider>

      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        style={{ fontSize: 20, padding: 10, height: "auto", marginBottom: 25 }}
        onClick={() => setOpenDotacion(true)}
      >
        Agregar Dotación Requisito al Perfil
      </Button>
      <Table dataSource={dataDotacionAsignados} columns={dotacionColumns} />

      <Modal
        width="70%"
        centered
        title={"Agregar Requisitos al perfil: " + perfil.nombre_perfil}
        open={openDotacion}
        onOk={() => {
          formDotacion.validateFields().then((values) => {
            formDotacion.resetFields();
            handleCreateDotacion(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          formDotacion.resetFields();
          setOpenDotacion(false);
        }}
      >
        <Form form={formDotacion} layout="vertical">
          <Form.Item
            label="Seleccione los elementos de dotación"
            name="dotaciones"
            rules={[
              {
                required: true,
                message: "Por favor seleccione los elementos de dotación",
              },
            ]}
          >
            <Select
              style={{ marginBottom: 50 }}
              mode="multiple"
              options={dataDotacion.map((dotacion) => {
                return {
                  label: dotacion.nombre,
                  value: dotacion.id,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>

      <Divider orientation="left">
        <h2>Otros Requisitos</h2>
      </Divider>

      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        style={{ fontSize: 20, padding: 10, height: "auto", marginBottom: 25 }}
        onClick={() => setOpenOtros(true)}
      >
        Agregar Otro Requisito al Perfil
      </Button>

      <Table dataSource={dataOtrosAsignados} columns={otrosColumns} />

      <Modal
        width="70%"
        centered
        title={"Agregar Requisitos al perfil: " + perfil.nombre_perfil}
        open={openOtros}
        onOk={() => {
          formOtros.validateFields().then((values) => {
            formOtros.resetFields();
            handleCreateOtro(values);
          });
          // .catch((info) => onFinishFailed(info));
        }}
        onCancel={() => {
          formOtros.resetFields();
          setOpenOtros(false);
        }}
      >
        <Form form={formOtros} layout="vertical">
          <Form.Item
            label="Seleccione los elementos de dotación"
            name="otros"
            rules={[
              {
                required: true,
                message: "Por favor seleccione los elementos de dotación",
              },
            ]}
          >
            <Select
              style={{ marginBottom: 50 }}
              mode="multiple"
              options={dataOtros.map((otro) => {
                return {
                  label: otro.nombre_otro,
                  value: otro.id_otro,
                };
              })}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
