import {
  BookOutlined,
  BulbOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <div>
        <Menu mode="horizontal" className="menu">
          <Menu.Item
            onClick={() => navigate("employees")}
            className="menu-item"
            key="employees"
            icon={<UserOutlined style={{ fontSize: "32px" }} />}
          >
            Empleados
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("cursos")}
            className="menu-item"
            key="cursos"
            icon={<BookOutlined style={{ fontSize: "32px" }} />}
          >
            Cursos
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("perfiles")}
            className="menu-item"
            key="perfiles"
            icon={<BulbOutlined style={{ fontSize: "32px" }} />}
          >
            Perfiles
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("examenes")}
            className="menu-item"
            key="examenes"
          >
            Exámenes
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("dotacion")}
            className="menu-item"
            icon={<ToolOutlined style={{ fontSize: 32 }} />}
            key="dotacion"
          >
            Dotación
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("otros-requisitos")}
            className="menu-item"
            key="otros"
          >
            Otros Requisitos
          </Menu.Item>
        </Menu>
      </div>
      <div style={{ width: "80%", margin: "auto" }}>
        <Outlet></Outlet>
      </div>
    </>
  );
}

export default App;
