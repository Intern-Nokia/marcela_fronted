import { Divider, List } from "antd";
import { examenesPersonal } from "../Employees/data";
import moment from "moment";

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
                    </List.Item>
                )}
            />
        </>
    )
}

export default Exams