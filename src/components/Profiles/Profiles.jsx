// import { Collapse, Divider, List } from "antd";

// import { perfilesPersonal, eppPerfil, cursoPerfil, examenPerfil, otrosRequisitos } from "./profilesData";

// const { Panel } = Collapse;

// function Profiles({ employee }) {
//   const filterProfile = perfilesPersonal.filter(
//     (p) => p.Legajo === employee.Legajo
//   );

//   return (
//     <>
//       <Divider orientation="left">
//         <h2>Perfiles empleado</h2>
//       </Divider>

//       <List
//         style={{
//           maxWidth: "80%",
//           margin: "auto auto",
//         }}
//         dataSource={filterProfile}
//         renderItem={(emp) => (
//           <>
//             <List.Item key={emp.Legajo}>
//               <List.Item.Meta title={emp.Tipoperfil} />
//               <div>
//                 <h3>{emp.empresa}</h3>
//               </div>
//             </List.Item>
//             <Collapse>
//               <Panel header="Requisitos perfil">
//                 <Collapse accordion>
//                   <Panel header="EPP por perfil">
//                     <List
//                       dataSource={eppPerfil.filter(
//                         (e) => e.perfil === emp.Perfilasignado
//                       )}
//                       renderItem={(epp, i) => (
//                         <List.Item key={i}>
//                           <List.Item.Meta
//                             title={epp.nombre}
//                             description={epp.descripcion}
//                           />
//                         </List.Item>
//                       )}
//                     ></List>
//                   </Panel>
//                   <Panel header="Cursos por perfil">
//                     <List
//                         dataSource={cursoPerfil.filter((curso) => curso.perfil === emp.Perfilasignado)}
//                         renderItem={(curso, i) => (
//                             <List.Item key={i}>
//                                 <List.Item.Meta
//                                     title={curso.nombre}
//                                     description={"Codigo SENCE: " + i + curso.SENCE}
//                                 />
//                                 <div>
//                                     {curso.organizacion}
//                                 </div>
//                             </List.Item>
//                         )}/>
//                   </Panel>
//                   <Panel header="Exámenes por perfil">
//                     <List
//                         dataSource={examenPerfil.filter((exa) => exa.perfil === emp.Perfilasignado)}
//                         renderItem={(examen, i ) => (
//                             <List.Item key={i}>
//                                 <List.Item.Meta title={examen.nombre}
//                                     description={examen.obsevaciones}/>
//                             </List.Item>
//                         )}
//                     />
//                   </Panel>
//                   <Panel header="Otros requisitos por perfil">
//                     <List 
//                       dataSource={otrosRequisitos.filter((r) => r.Perfil === emp.Perfilasignado)}
//                       renderItem={(otro, i) => (
//                         <List.Item key={i}>
//                           <List.Item.Meta title={otro.Requisito}/>
//                         </List.Item>
//                       )}/>
//                   </Panel>
//                 </Collapse>
//               </Panel>
//             </Collapse>
//           </>
//         )}
//       />
//     </>
//   );
// }

import { Typography, List, Divider } from "antd"
import moment from "moment";

const { Text } = Typography

function Profiles({ employee }) {

    const profiles = [
      "AMSA Centinela 4540005270",
      "AMSA Centinela 4540005745",
      "Los Bronces N° 12101041",
      "BHP Spence",
      "TECK Quebrada Blanca",
      "MEL"
    ]


    const renderItem = (item) => {
        const isProfile = employee[item] !== ""

        if (isProfile) {
            return (
                <List.Item>
                    <List.Item.Meta title={item} />
                    <div>
                        <Text strong type={employee[item] === "OK" ? "success" : "danger"}>
                            {employee[item]}
                        </Text>
                    </div>
                </List.Item>
            )
        }

    }

    return (
        <>
            <Divider orientation="left">
                <h2>Clientes asociados al empleado</h2>
            </Divider>
            <List
                style={{
                    width: '60%',
                    margin: 'auto auto'
                }}
                dataSource={profiles}
                renderItem={renderItem}
            />
        </>
    )
}

export default Profiles;
