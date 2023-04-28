import { BookOutlined, BulbOutlined, UserOutlined } from "@ant-design/icons";
import { AutoComplete, Input, Menu } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Employees from "./components/Employees/Employees";
import employees from "./components/Employees/data";

const { Search } = Input;

const filterEmployes = employees.map((p) => {
  return { value: p.Nombre + ' ' + p.Apellidopaterno };
});

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
        <AutoComplete
          options={filterEmployes}
          filterOption={(inputValue, option) =>
            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
          }
        >
          <Search
            placeholder="Buscar empleado"
            allowClear
            enterButton="Search"
            size="large"
            onSearch={handleSearch}
          />
        </AutoComplete>

      </div>
      <Employees employee={employee}/>
      {/* {viewProjects && employee && <Projects searchEmployee={employee} />} */}
      {/* {viewCourse && employee && <Courses user={employee}/>} */}
    </>
  );
}

export default App;
