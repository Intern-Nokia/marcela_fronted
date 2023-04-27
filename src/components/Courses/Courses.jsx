import { Divider, List, Typography } from "antd";
import React, { useState } from "react";
import { coursesUser } from "./dataCourses";

const { Text } = Typography;

const Courses = ({ user }) => {

  const userCourses = coursesUser[0].cursos

  console.log(userCourses)

  const vigencia = (vigente, proximoVencimiento) => {

    if (proximoVencimiento) {
        return ["warning", "Proximo a vencer"]
    }
    if (vigente) {
        return ["success", "Vigente"]
    }
    return ["danger", "Vencido"]
    
  }
  
  return (
    <>
      <Divider orientation="left">
        <h2>Cursos del usuario</h2>
      </Divider>
      {user && (
        <List
            style={{
                maxWidth: '80%',
                margin: 'auto auto'                
                
            }}
          dataSource={userCourses}
          renderItem={(course) => (
            <List.Item key={course.nombreCurso}>
              <List.Item.Meta
                title={<a href="#">{course.nombreCurso}</a>}
                description="Descripcion del curso"
              />
              <Text type={vigencia(course.vigente, course.vencimientoProximo)[0]}>{vigencia(course.vigente, course.vencimientoProximo)[1]}</Text>
            </List.Item>
          )}
        ></List>
      )}
    </>
  );
};

export default Courses;
