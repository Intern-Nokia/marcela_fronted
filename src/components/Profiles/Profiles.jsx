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

import { Typography, List, Divider, Collapse, Table, Modal } from "antd"
import moment from "moment";
import { useState } from "react";
import "./profiles.css"

const { Text } = Typography
const { Panel } = Collapse

export function Clients({ employee }) {

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
        <div>
            <Divider orientation="left">
                <h2>Clientes asociados al empleado</h2>
            </Divider>
            <Collapse style={{
                width: '60%',
                margin: 'auto auto'
            }}>
                <Panel header="Clientes">
                    <List
                        dataSource={profiles}
                        renderItem={renderItem}
                    />
                </Panel>
            </Collapse>
        </div>
    )
}

export function Profiles({ employee }) {

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleOk = () => setIsModalOpen(false)

    const handleClick = (columnName) => {
        console.log(columnName)
        setIsModalOpen(true)
    }

    const types = [
        "warning",
        "success",
        "danger"
    ]

    const columns = [
        {
            title: 'Empleado',
            dataIndex: 'Empleado',
            key: 'Empleado'
        },
        {
            title: 'Perfil Acreditación 1',
            dataIndex: 'Perfil Acreditación 1',
            key: 'Perfil Acreditación 1',
            render: (text, record, index) => (
                <Text onClick = {() => handleClick('Ingreso Oficina')} type={types[index % types.length]} strong>{text}</Text>
            )
        },
        {
            title: 'Perfil Acreditación 2',
            dataIndex: 'Perfil Acreditación 2',
            key: 'Perfil Acreditación 2',
            render: (text, record, index) => (
                <Text onClick = {() => handleClick('Conductor Mina')} type={types[index % types.length + 1]} strong>{text}</Text>
            )
        },
        {
            title: 'Perfil Acreditación 3',
            dataIndex: 'Perfil Acreditación 3',
            key: 'Perfil Acreditación 3',
            render: (text, record, index) => (
                <Text onClick = {() => handleClick('Trabajo en altura')} type={types[index % types.length + 2]} strong>{text}</Text>
            )
        },
        {
            title: 'Perfil Acreditación 4',
            dataIndex: 'Perfil Acreditación 4',
            key: 'Perfil Acreditación 4',
            render: (text, record, index) => (
                <Text onClick ={ () => handleClick('Conductor Admin')} type={types[index % types.length]} strong>{text}</Text>
            )
        },
        {
            title: 'Cliente',
            dataIndex: 'Cliente',
            key: 'Cliente'
        }
    ]

    const data = [
        {
            Empleado: employee.Trabajador,
            'Perfil Acreditación 1': 'Ingreso Oficina',
            'Perfil Acreditación 2': 'Conductor Mina',
            'Perfil Acreditación 3': 'Trabajo en altura',
            'Perfil Acreditación 4': 'Conductor Admin',
            Cliente: 'AMSA'
        },
        {
            Empleado: employee.Trabajador,
            'Perfil Acreditación 1': 'Ingreso Oficina',
            'Perfil Acreditación 2': 'Conductor Mina',
            'Perfil Acreditación 3': 'Trabajo en altura',
            'Perfil Acreditación 4': 'Conductor Admin',
            Cliente: 'BHP'
        },
        {
            Empleado: employee.Trabajador,
            'Perfil Acreditación 1': 'Ingreso Oficina',
            'Perfil Acreditación 2': 'Conductor Mina',
            'Perfil Acreditación 3': 'Trabajo en altura',
            'Perfil Acreditación 4': 'Conductor Admin',
            Cliente: 'MEL'
        },

    ]

    const requisitosColumnas = [
        {
            title: 'Documentos',
            dataIndex: 'Documento',
            key: 'Documentos'
        },
        {
            title: 'Curso Conductor Mina',
            dataIndex: 'Curso Conductor Mina',
            key: 'Curso Conductor Mina'
        },
        {
            title: 'Curso Ingreso Mina',
            dataIndex: 'Curso Ingreso Mina',
            key: 'Curso Ingreso Mina'
        },
        {
            title: 'Licencia',
            dataIndex: 'Licencia',
            key: 'Licencia'
        }
    ]

    const dataRequisitos = [
        {
            Documento: 'DNI',
            'Curso Conductor Mina': 'Curso 01 Conducción Mina (YYYY-MM-dd)',
            'Curso Ingreso Mina': 'Curso 01 Ingreso Mina (YYYY-MM-dd)',
            Licencia: 'Licencia especial'
        },
        {
            Documento: 'Pasaporte',
            'Curso Conductor Mina': 'Curso 02 Conducción Mina (YYYY-MM-dd)',
            'Curso Ingreso Mina': 'Curso 02 Ingreso Mina (YYYY-MM-dd)',
            Licencia: 'Licencia Normal'
        },
        {
            Documento: 'Visa',
            'Curso Conductor Mina': 'Curso 03 Conducción Mina (YYYY-MM-dd)',
            'Curso Ingreso Mina': 'Curso 03 Ingreso Mina (YYYY-MM-dd)',
            Licencia: 'Licencia ultra'
        }
    ]

    return (
        <>
            <Divider orientation="left">
                <h2>Perfiles del empleado</h2>
            </Divider>
            <div className="leyendas">
                <div className="leyenda-item" style={{backgroundColor: "#73d13d"}}></div>
                <span>Cumple requisitos</span>
                <div className="leyenda-item" style={{backgroundColor: "#ffec3d"}}></div>
                <span>Documentación o cursos pendientes</span>
                <div className="leyenda-item" style={{backgroundColor: "#ff4d4f"}}></div>
                <span>No cumple requisitos</span>

            </div>
            <div style={{
                width: '60%',
                margin: 'auto auto'
            }}>
                <Table dataSource={data}
                    columns={columns}
                />
            </div>
            <Modal
                open={isModalOpen}
                title={"Requisitos perfil"}
                okText="OK"
                onOk={handleOk}
                onCancel={handleOk}
            >
                <Table dataSource={dataRequisitos}
                    columns={requisitosColumnas} />
            </Modal>

        </>
    )
}