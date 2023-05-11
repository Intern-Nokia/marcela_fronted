import { useLocation } from "react-router-dom"
import Courses from "../Courses/Courses"
import Exams from "../Exams/Exams"
import {Clients, Profiles} from "../Profiles/Profiles"
import { Divider } from "antd"
import { Dotacion } from "../Dotacion/Dotacion"

function EmployeeInfo() {
    const location = useLocation()
    const employee = location.state.employee

    return (
        <div style={{marginBottom: '100px'}}>
        <Divider orientation="center">
            <h1>Información del empleado {employee.Trabajador}</h1>
        </Divider>
        <Profiles employee={employee}/>
        <Courses employee={employee}/>
        <Exams employee={employee}/>
        <Clients employee={employee}/>
        <Dotacion employee={employee}/>
        </div>
    )

}

export default EmployeeInfo