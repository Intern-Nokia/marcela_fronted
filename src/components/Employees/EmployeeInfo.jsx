import { useLocation } from "react-router-dom";
import Courses from "../Courses/Courses";
import Exams from "../Exams/Exams";
import { Clients, Profiles } from "../Profiles/Profiles";
import {
  Button,
  Checkbox,
  Col,
  DatePicker,
  Divider,
  Form,
  Input,
  Row,
  Select,
  Switch,
} from "antd";
import { Dotacion } from "../Dotacion/Dotacion";
import { CursosUsuario } from "../Courses/CursosUsuario";
import { useState } from "react";
import "./employees.css";
import dayjs from "dayjs";
import { DotacionUsuario } from "../Dotacion/DotacionUsuario";
import { OtrosUsuario } from "../Otros/OtrosUsuario";

function EmployeeInfo() {
  const location = useLocation();
  const employee = location.state.employee;

  return (
    <div style={{ marginBottom: "100px" }}>
      <Divider orientation="center">
        <h1>Información del empleado {employee.trabajador}</h1>
      </Divider>

      <DataEmployee />
      <CursosUsuario employee={employee} />
      <DotacionUsuario employee={employee} />
      <OtrosUsuario employee={employee} />
      {/* <Profiles employee={employee}/> */}
      {/* <Courses employee={employee} />
      <Exams employee={employee} />
      {/* <Clients employee={employee}/> */}
      {/* <Dotacion employee={employee} /> */}
    </div>
  );
}

function DataEmployee() {
  const location = useLocation();
  const employee = location.state.employee;

  const [formDisabled, setFormDisabled] = useState(false);

  employee.fechaNacimiento = dayjs(employee.fechaNacimiento, "M/D/YYYY");

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Switch
        checked={formDisabled}
        checkedChildren="Editar trabajador"
        unCheckedChildren="Editar trabajador"
        onChange={(e) => setFormDisabled(!formDisabled)}
        style={{
          display: "inline-flex",
          flexDirection: "row-reverse",
          margin: "1rem 0",
        }}
      >
        Editar Trabajador
      </Switch>
      <Form
        disabled={!formDisabled}
        initialValues={employee}
        onFinish={(values) => console.log(values)}
      >
        <Row>
          <Col span={12}>
            <Form.Item
              name="CI"
              label="RUT"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item
              name="trabajador"
              label="Nombre trabajador"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              name="cargo"
              label="Cargo"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="empresa"
              label="Empresa"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12}>
            <Form.Item
              name="correo"
              label="Correo Empresarial"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              name="correoPersonal"
              label="Correo Personal"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item
              name="telefono"
              label="Telefono"
              labelCol={{ offset: 4, span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={10}>
            <Form.Item
              name="direccion"
              label="Dirección"
              labelCol={{ offset: 4, span: 6 }}
              wrapperCol={{ span: 16 }}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item
              name="ciudad"
              label="Ciudad"
              labelCol={{ offset: 4, span: 8 }}
              wrapperCol={{ span: 12 }}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name="fechaNacimiento" label="Fecha de Nacimiento">
              <DatePicker />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="edad" label="Edad">
              <Input />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item name="estadoCivil" label="Estado Civil">
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

        <Row>
          <Col>
            <Button type="primary" htmlType="submit">
              Guardar
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default EmployeeInfo;
