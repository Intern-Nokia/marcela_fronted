import { Avatar, List } from "antd";
import React, { useState, useEffect } from "react";
import axios from "axios";


const Courses = () => {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        axios
          .get("http://localhost:5000/cursos")
          .then((response) => {
            console.log(response);
            setCourses(response.data);
          })
          .catch((err) => console.log("error", err));
      }, []);

      return (
        <List
            itemLayout="vertical"
            size="large"
            pagination={{
                onChange: (page) => {console.log(page)},
                pageSize: 3
            }}
            dataSource={courses}
            renderItem={(item) => (
                <List.Item key={item["ID curso"]}
                extra={
                    <img
                        width={272}
                        alt="logo"
                        src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                        />
                }>
                    <List.Item.Meta
                        avatar={<Avatar src={item.image}/>}
                        title={<a href="#">{item["Nombre curso"]}</a>}
                        description={"Organización:" + item['Organización que lo dicta']}
                        />

                </List.Item>
            )}/>
      )
}

export default Courses