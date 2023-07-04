import {
  BookOutlined,
  BulbOutlined,
  UserOutlined,
  ToolOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import { Navigate, Outlet, Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import { useState } from "react";
import Employees from "./components/Employees/Employees";
import Exams from "./components/Exams/Exams";
import { Dotacion } from "./components/Dotacion/Dotacion";
import Courses from "./components/Courses/Courses";
import { Otros } from "./components/Otros/Otros";
import EmployeeInfo from "./components/Employees/EmployeeInfo";
import { Profiles } from "./components/Profiles/Profiles";
import { RequisitosPerfil } from "./components/Profiles/RequisitosPerfil";
import { EmployeeProfile } from "./components/Employees/EmployeeProfile";
import Login from "./Login";

function App() {
  const navigate = useNavigate();
  const [isLoggedIn, setLoggedIn] = useState(false);

  const handleLogin = (loggedIn) => {
    setLoggedIn(loggedIn);
  };

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  }

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
      <Routes>
        <Route exact path="/" element={<Login onLogin={handleLogin} />} />
        <Route path="/home" element={<App />}>
          <Route path="/home/employees" element={<Employees />} />
          <Route path="/home/examenes" element={<Exams />} />
          <Route path="/home/dotacion" element={<Dotacion />} />
          <Route path="/home/cursos" element={<Courses />} />
          <Route path="/home/otros-requisitos" element={<Otros />} />
          <Route path="/home/infoEmployee" element={<EmployeeInfo />} />
          <Route path="/home/perfiles" element={<Profiles />} />
          <Route
            path="/home/perfiles/requisitos-perfil"
            element={<RequisitosPerfil />}
          />
          <Route path="/home/employees/profile" element={<EmployeeProfile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
