import { BookOutlined, BulbOutlined, UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Menu } from "antd";
import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees/Employees";
import employees from "./components/Employees/data";

const { Search } = Input;



function App() {
  const navigate = useNavigate();


  

  return (
    <>
      <div>
        <Menu mode="horizontal" className="menu">
          <Menu.Item
            onClick={() => navigate("/employees")}
            className="menu-item"
            key="employees"
            icon={<UserOutlined style={{ fontSize: "32px" }} />}
          >
            Empleados
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("empresas")}
            className="menu-item"
            key="empresas"
            icon={<BookOutlined style={{ fontSize: "32px" }} />}
          >
            Empresas
          </Menu.Item>
          <Menu.Item
            onClick={() => navigate("training")}
            className="menu-item"
            key="trainings"
            icon={<BulbOutlined style={{ fontSize: "32px" }} />}
          >
            Clientes
          </Menu.Item>
        </Menu>
      </div>
      <div>
        <Outlet></Outlet>
      </div>
      
      {/* <Employees employee={employee}/> */}
      {/* {viewProjects && employee && <Projects searchEmployee={employee} />} */}
      {/* {viewCourse && employee && <Courses user={employee}/>} */}
    </>
  );
}

export default App;
