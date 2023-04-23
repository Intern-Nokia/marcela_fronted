import "./App.css";
import { Menu } from "antd";
import { UserOutlined, BookOutlined, BulbOutlined } from "@ant-design/icons";

function App() {
  return (
    <Menu mode="horizontal" className="menu">
      <Menu.Item
        className="menu-item"
        key="employees"
        icon={<UserOutlined style={{fontSize: '32px'}} />}
      >
        Empleados
      </Menu.Item>
      <Menu.Item
        className="menu-item"
        key="courses"
        icon={<BookOutlined style={{fontSize: '32px'}}/>}
      >
        Cursos
      </Menu.Item>
      <Menu.Item
        className="menu-item"
        key="trainings"
        icon={<BulbOutlined style={{fontSize: '32px'}} />}
      >
        Capacitaciones
      </Menu.Item>
    </Menu>
  );
}

export default App;
