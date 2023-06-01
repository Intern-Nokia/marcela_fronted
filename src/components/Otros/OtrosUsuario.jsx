import { Divider, List } from "antd";
import axios from "axios";
import { useEffect, useState } from "react";
import { FilePdfTwoTone } from "@ant-design/icons";

export function OtrosUsuario({ employee }) {
  const [otrosUsuario, setOtrosUsuario] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/otros/" + employee?.CI)
      .then((res) => setOtrosUsuario(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div style={{ width: "90%", margin: "auto" }}>
      <Divider orientation="right">
        <h2>Otros</h2>
      </Divider>
      <List
        style={{ width: "80%", margin: "auto" }}
        dataSource={otrosUsuario}
        renderItem={(item) => (
          <List.Item key={item.nombre}>
            <List.Item.Meta title={item.nombre} />
            <div>
              <a
                href="https://africau.edu/images/default/sample.pdf"
                target="_blank"
              >
                <FilePdfTwoTone
                  twoToneColor="#eb2f96"
                  style={{ fontSize: "1.8rem", textAlign: "center", margin: 0 }}
                />
              </a>
            </div>
          </List.Item>
        )}
      />
    </div>
  );
}
