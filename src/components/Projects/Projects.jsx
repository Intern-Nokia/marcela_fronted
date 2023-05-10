// import { Divider, List, Typography, Collapse } from "antd";
// import { projects } from "./dataProjects";
// import { cursosEmployee } from "../Courses/dataCourses";
// import {CloseCircleTwoTone} from '@ant-design/icons'


// const { Text } = Typography;
// const { Panel } = Collapse;

// const Projects = ({ employee }) => {



//   return (
//     <>
//       <Divider orientation="left">
//         <h2>Proyectos</h2>
//       </Divider>
//       "
//       <List
//         dataSource={projects}
//         style={{
//           maxWidth: "80%",
//           margin: "auto auto",
//         }}
//         renderItem={(p) => (
//           <>
//             <List.Item key={p.nombre}>
//               <List.Item.Meta
//                 title={p.nombre}
//                 description="Descripcion del proyecto"
//               />
//             </List.Item>
//             <Collapse>
//               <Panel header="Requisitos">
//                 <div>
//                   <h3>Documentos</h3>
//                   <ul>
//                     {p.requisitoDocumentos.map((d) => (
//                       <li>{d}</li>
//                     ))}
//                   </ul>
//                 </div>
//                 <div>
//                 <h3>Cursos</h3>
//                   <ul>
//                     {p.requisitoCursos.map((c) => (

//                       <li>{c} <CloseCircleTwoTone twoToneColor="#eb2f96" /></li>
//                     ))}
//                   </ul>
//                 </div>
//               </Panel>
//             </Collapse>
//           </>
//         )}
//       />
//     </>
//   );
// };

import { Divider, List } from "antd";
import { projects } from "./dataProjects"

function Projects() {
  return (
    <>
      <Divider>
        <h1>Requisitos Clientes</h1>
      </Divider>
      {projects.map((project) => {
        return (
        <>
        <Divider orientation="left">
          <h3>{project.empresa}</h3>
        </Divider>
        <List 
        style={{
          width: '60%',
          margin: 'auto auto'
        }}
        dataSource={project.requisitos}
        renderItem={(requisito, i) => (
          <List.Item key={i}>
            <List.Item.Meta
              title={requisito}/>
          </List.Item>
        )}/>
        </>
        )
      })}
    </>

  )
}

export default Projects;
