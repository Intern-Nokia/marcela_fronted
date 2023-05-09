import { Divider, List } from "antd";
import { examenesPersonal } from "../Employees/data";
import moment from "moment";
import { LinkOutlined } from "@ant-design/icons"

function Exams({employee}) {

    const filteredExamns = examenesPersonal.filter((e) => e.Legajo === employee.Legajo)

    return (
        <>
            <Divider orientation="left">
                <h2>Examenes del empleado</h2>
            </Divider>
            <List dataSource={filteredExamns}
                renderItem={(examen, i) => (
                    <List.Item key={i}>
                        <List.Item.Meta
                            title={examen.nombre}
                        />
                        <div>
                            {moment(examen.fecha).format("MMMM Do YYYY") + " - " + moment(examen.fechaVencimiento).format("MMMM Do YYYY")} 
                        </div>
                        <a href="https://africau.edu/images/default/sample.pdf"
                         target="_blank"
                         style={{
                            padding: '10px'
                         }}>
                            <LinkOutlined />
                        </a>
                    </List.Item>
                )}
            />
        </>
    )
}

export default Exams