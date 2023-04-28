import { Divider, List, Typography } from "antd";
import React, { useState } from "react";
import { cursosEmployee } from "./dataCourses";
import moment from "moment";

const { Text } = Typography;

export const vigencia = (fechaVencimiento) => {

  const now = moment()
  const vigencyDate = moment(fechaVencimiento)
  const inAWeek = now.clone()

  inAWeek.add(7, "days")

  if (vigencyDate.isBetween(now, inAWeek)) {
    return ["warning", "Curso proximo a vencer"]
  }

  if (now.isBefore(vigencyDate)){
    return ["success", "Curso vigente"]
  }

  return ["danger", "Curso vencido"]
  
}


const Courses = ({ employee }) => {

  const filterCurses = cursosEmployee.filter((c) =>  c.Legajo === employee.Legajo)

  console.log("Employee", employee)
  console.log(filterCurses)

  
  
  return (
    <>
      <Divider orientation="left">
        <h2>Cursos del usuario</h2>
      </Divider>
        <List
            style={{
                maxWidth: '80%',
                margin: 'auto auto'                
                
            }}
          dataSource={filterCurses}
          renderItem={(course) => (
            <List.Item key={course.Nombrecurso}>
              <List.Item.Meta
                title={<a href="#">{course.Nombrecurso}</a>}
                description="descripcion curso"
              />
              <div><Text strong type={vigencia(course.Fechavencimiento)[0]}>{vigencia(course.Fechavencimiento)[1]}</Text></div>
            </List.Item>
          )}
        />
    </>
  );
};

export default Courses;
