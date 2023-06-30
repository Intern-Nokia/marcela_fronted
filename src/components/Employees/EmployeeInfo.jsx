import {
  Button,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import axios from "axios";
import dayjs from "dayjs";
import moment from "moment";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { CursosUsuario } from "../Courses/CursosUsuario";
import { DotacionUsuario } from "../Dotacion/DotacionUsuario";
import { ExamenesUsuario } from "../Exams/ExamenesUsuario";
import { OtrosUsuario } from "../Otros/OtrosUsuario";
import { PerfilesUsuario } from "../Profiles/PerfilesUsuario";
import "./employees.css";

function EmployeeInfo() {
  const location = useLocation();
  const employee = location.state.employee;

  return (
    <div style={{ marginBottom: "100px" }}>
      <Divider orientation="center">
        <h1>Información del empleado {employee.trabajador}</h1>
      </Divider>

      <DataEmployee />
      <PerfilesUsuario employee={employee} />
      <CursosUsuario employee={employee} />
      <ExamenesUsuario employee={employee} />
      <DotacionUsuario employee={employee} />
      <OtrosUsuario employee={employee} />
    </div>
  );
}

function DataEmployee() {
  const location = useLocation();
  const employee = location.state.employee;
  const [messageApi, contextHolder] = message.useMessage();
  const [formDisabled, setFormDisabled] = useState(false);

  const handleEdit = (values) => {
    values.fecha_nacimiento = moment(values.fecha_nacimiento).format(
      "YYYY/MM/DD"
    );
    axios
      .put("http://localhost:5000/personal/" + employee.CI, values)
      .then(() =>
        messageApi.open({
          type: "success",
          content: "Usuario Actualizado Exitosamente",
        })
      )
      .catch((err) =>
        messageApi.open({
          type: "success",
          content: `No se pudo actualizar el usuario. ${err}`,
        })
      );
    setFormDisabled(!formDisabled);
  };

  employee.fecha_nacimiento = dayjs(employee.fecha_nacimiento, "YYYY/MM/DD");

  return (
    <div>
      {contextHolder}
      <Switch
        checked={formDisabled}
        checkedChildren="Editar trabajador"
        unCheckedChildren="Editar trabajador"
        onChange={() => setFormDisabled(!formDisabled)}
        style={{
          display: "inline-flex",
          flexDirection: "row-reverse",
          margin: "2rem 0",
        }}
      >
        Editar Trabajador
      </Switch>
      <Form
        disabled={!formDisabled}
        initialValues={employee}
        onFinish={handleEdit}
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 14 }}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Form.Item
              name="tipo_identificacion"
              label="Tipo de identificación"
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
          </Col>
          <Col span={12}>
            <Form.Item name="CI" label="No. Identificación">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="trabajador" label="Nombre trabajador">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="cargo" label="Cargo">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="empresa" label="Empresa">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="correo" label="Correo Empresarial">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="correo_personal" label="Correo Personal">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="telefono" label="Telefono" align="top">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="direccion" label="Dirección">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="ciudad" label="Ciudad">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="fecha_nacimiento" label="Fecha de Nacimiento">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="edad" label="Edad">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
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
          </Col>
        </Row>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          style={{ display: "block", margin: "20px auto" }}
        >
          Guardar
        </Button>
      </Form>
    </div>
  );
}

export default EmployeeInfo;
