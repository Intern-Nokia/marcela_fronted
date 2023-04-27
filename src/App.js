import "./App.css";
import { Input, Menu, Divider } from "antd";
import { UserOutlined, BookOutlined, BulbOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";
import Employees from "./components/Employees/Employees";
import { useState } from "react";

const { Search } = Input;

function App() {
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const handleSearch = (value) => {
    setEmployee(value);
  };

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
            onClick={() => navigate("courses")}
            className="menu-item"
            key="courses"
            icon={<BookOutlined style={{ fontSize: "32px" }} />}
          >
            Cursos
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("training")}
            className="menu-item"
            key="trainings"
            icon={<BulbOutlined style={{ fontSize: "32px" }} />}
          >
            Capacitaciones
          </Menu.Item>
        </Menu>
      </div>
      <div className="search">
        <Search
          placeholder="Buscar empleado"
          allowClear
          enterButton="Search"
          size="large"
          onSearch={handleSearch}
        />
      </div>
      <Divider orientation="left">
        <h2>Información del empleado</h2>
      </Divider>
      {employee && <Employees searchEmployee={employee} />}
    </>
  );
}

export default App;
