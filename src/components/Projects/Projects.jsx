import { Divider, List, Typography, Collapse } from "antd";
import { projects } from "./dataProjects";
import { cursosEmployee } from "../Courses/dataCourses";
import {CloseCircleTwoTone} from '@ant-design/icons'


const { Text } = Typography;
const { Panel } = Collapse;

const Projects = ({ employee }) => {



  return (
    <>
      <Divider orientation="left">
        <h2>Proyectos</h2>
      </Divider>
      "
      <List
        dataSource={projects}
        style={{
          maxWidth: "80%",
          margin: "auto auto",
        }}
        renderItem={(p) => (
          <>
            <List.Item key={p.nombre}>
              <List.Item.Meta
                title={p.nombre}
                description="Descripcion del proyecto"
              />
            </List.Item>
            <Collapse>
              <Panel header="Requisitos">
                <div>
                  <h3>Documentos</h3>
                  <ul>
                    {p.requisitoDocumentos.map((d) => (
                      <li>{d}</li>
                    ))}
                  </ul>
                </div>
                <div>
                <h3>Cursos</h3>
                  <ul>
                    {p.requisitoCursos.map((c) => (

                      <li>{c} <CloseCircleTwoTone twoToneColor="#eb2f96" /></li>
                    ))}
                  </ul>
                </div>
              </Panel>
            </Collapse>
          </>
        )}
      />
    </>
  );
};

export default Projects;
