import { Alert, Button, Form, Input, message } from "antd";
import { login } from "./components/Requests/Login";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function Login({ onLogin }) {
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    const res = await login(values);
    if (res.status === 401) {
      setError(true);
    } else {
      setError(null);
      onLogin(true);
      navigate("/home");
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log(errorInfo);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <Form
          className="login-form"
          name="login"
          style={{ maxWidth: 600 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item>
            <h1 className="login-form-title">NOKIA</h1>
          </Form.Item>
          <Form.Item
            label="Usuario"
            name="email"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            rules={[
              {
                required: true,
                message: "Por favor ingrese el usuario",
              },
            ]}
          >
            <Input className="login-form-input" />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            label="Contraseña"
            name="password"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la contraseña",
              },
            ]}
          >
            <Input.Password className="login-form-input" />
          </Form.Item>
          <Form.Item>
            <Button
              className="login-form-button"
              type="primary"
              htmlType="submit"
            >
              Iniciar Sesión
            </Button>
          </Form.Item>
          {error && (
            <Alert
              message="Error: Usuario o contraseña incorrectos"
              type="error"
              showIcon
              style={{
                color: "red",
                textAlign: "center",
              }}
            />
          )}
        </Form>
      </div>
    </div>
  );
}
