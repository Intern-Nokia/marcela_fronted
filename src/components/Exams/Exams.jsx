// import { Divider, List } from "antd";
// import { examenesPersonal } from "../Employees/data";
// import moment from "moment";
// import { LinkOutlined } from "@ant-design/icons"
// import "./examenes.css"

// function Exams({employee}) {

//     const filteredExamns = examenesPersonal.filter((e) => e.Legajo === employee.Legajo)

//     return (
//         <>
//             <Divider orientation="left">
//                 <h2>Examenes del empleado</h2>
//             </Divider>
//             <List dataSource={filteredExamns}
//                 renderItem={(examen, i) => (
//                     <List.Item key={i} className="list-examenes">
//                         <List.Item.Meta
//                             title={examen.nombre}
//                         />
//                         <div>
//                             {moment(examen.fecha).format("MMMM Do YYYY") + " - " + moment(examen.fechaVencimiento).format("MMMM Do YYYY")} 
//                         </div>
//                         <a href="https://africau.edu/images/default/sample.pdf"
//                          target="_blank"
//                          style={{
//                             padding: '10px'
//                          }}>
//                             <LinkOutlined />
//                         </a>
//                     </List.Item>
//                 )}
//             />
//         </>
//     )
// }

import { Typography, List, Divider } from "antd"
import moment from "moment";

const { Text } = Typography

function Exams({ employee }) {

    const examenes = [
        "Exámen altura geográfica vencimiento",
        "Vencimiento Examen Altura Física",
        "Fecha realización Examen Sílice (vigencia 1 año)",
        "Fecha realización Examen Ruido (vigencia 1 año)",
        "Altura Geográfica para CENTINELA",
        "Drogas realización",
        "Psicosensometrico vencimiento"
    ]


    const renderItem = (item) => {
        const isExam = employee[item] !== ""

        if (isExam) {
            return (
                <List.Item>
                    <List.Item.Meta title={item} />
                    <div>
                        <Text strong type={moment(employee[item]).isBefore(moment()) ? "danger" : "success"}>
                            {moment(employee[item]).isBefore(moment(new Date)) ? "Vencido" : "Vigente"}
                        </Text>
                        <p>{employee[item]}</p>
                    </div>
                </List.Item>
            )
        }

    }

    return (
        <>
            <Divider orientation="left">
                <h2>Examenes del empleado</h2>
            </Divider>
            <List
                style={{
                    width: '60%',
                    margin: 'auto auto'
                }}
                dataSource={examenes}
                renderItem={renderItem}
            />
        </>
    )
}

export default Exams