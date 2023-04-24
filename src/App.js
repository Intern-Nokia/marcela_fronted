import "./App.css";
import { Menu } from "antd";
import { UserOutlined, BookOutlined, BulbOutlined } from "@ant-design/icons";
import { Outlet, useNavigate } from "react-router-dom";

function App() {

  const navigate = useNavigate()

  return (
    <>
    <div>
      <Menu mode="horizontal" className="menu">
        <Menu.Item
          onClick={() => navigate('employees')}
          className="menu-item"
          key="employees"
          icon={<UserOutlined style={{fontSize: '32px'}} />}
        >
          Empleados
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate('courses')}
          className="menu-item"
          key="courses"
          icon={<BookOutlined style={{fontSize: '32px'}}/>}
        >
          Cursos
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate('training')}
          className="menu-item"
          key="trainings"
          icon={<BulbOutlined style={{fontSize: '32px'}} />}
        >
          Capacitaciones
        </Menu.Item>
      </Menu>
    </div>
    <div>
      <Outlet></Outlet>
    </div>
    </>
    
  );
}

export default App;
