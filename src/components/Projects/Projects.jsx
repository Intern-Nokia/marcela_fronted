import { Divider, List, Typography, Collapse } from "antd";
import { projects } from "./dataProjects";
import { coursesUser } from "../Courses/dataCourses";

const { Text } = Typography;
const { Panel } = Collapse;

const Projects = ({ employee }) => {
  const verificarCurso = (cursosRequeridos, cursosUsuario) => {
    const cursosVigentes = cursosUsuario.filter((c) => {
      return c.vigente;
    });

    const cumpleCursos = cursosUsuario.map((c) => {
      cursosRequeridos.includes(cursosVigentes.nombreCurso);
    });

    console.log("cumpleCursos", cumpleCursos);
  };

  const courses = coursesUser[0].cursos;

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
              <Text type={verificarCurso(p.requisitoCursos, courses)}>
                {verificarCurso(p.requisitoCursos, courses)}
              </Text>
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
                      <li>{c}</li>
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
