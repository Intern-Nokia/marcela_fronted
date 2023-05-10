import { useLocation } from "react-router-dom"
import Courses from "../Courses/Courses"
import Exams from "../Exams/Exams"
import Profiles from "../Profiles/Profiles"

function EmployeeInfo() {
    const location = useLocation()
    const employee = location.state.employee

    return (
        <>
        <Courses employee={employee}/>
        <Exams employee={employee}/>
        <Profiles employee={employee}/>
        </>
    )

}

export default EmployeeInfo