import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import Employees from "./components/Employees/Employees";
import Exams from "./components/Exams/Exams";
import { Dotacion } from "./components/Dotacion/Dotacion";
import Courses from "./components/Courses/Courses";
import { Otros } from "./components/Otros/Otros";
import EmployeeInfo from "./components/Employees/EmployeeInfo";
import { Profiles } from "./components/Profiles/Profiles";
import { RequisitosPerfil } from "./components/Profiles/RequisitosPerfil";
import { EmployeeProfile } from "./components/Employees/EmployeeProfile";

import Login from "./Login";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route path="/home" element={<App />}>
        <Route path="/home/employees" element={<Employees />} />
        <Route path="/home/examenes" element={<Exams />} />
        <Route path="/home/dotacion" element={<Dotacion />} />
        <Route path="/home/cursos" element={<Courses />} />
        <Route path="/home/otros-requisitos" element={<Otros />} />
        <Route path="/home/employees/infoEmployee" element={<EmployeeInfo />} />
        <Route path="/home/perfiles" element={<Profiles />} />
        <Route
          path="/home/perfiles/requisitos-perfil"
          element={<RequisitosPerfil />}
        />
        <Route path="/home/employees/profile" element={<EmployeeProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
