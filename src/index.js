import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import Courses from "./components/Courses/Courses";
import { Dotacion } from "./components/Dotacion/Dotacion";
import EmployeeInfo from "./components/Employees/EmployeeInfo";
import { EmployeeProfile } from "./components/Employees/EmployeeProfile";
import Employees from "./components/Employees/Employees";
import Exams from "./components/Exams/Exams";
import { Otros } from "./components/Otros/Otros";
import { Profiles } from "./components/Profiles/Profiles";
import { RequisitosPerfil } from "./components/Profiles/RequisitosPerfil";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route path="/employees" element={<Employees />} />
        <Route path="/examenes" element={<Exams />} />
        <Route path="/dotacion" element={<Dotacion />} />
        <Route path="/cursos" element={<Courses />} />
        <Route path="/otros-requisitos" element={<Otros />} />
        <Route path="/infoEmployee" element={<EmployeeInfo />} />
        <Route path="/perfiles" element={<Profiles />} />
        <Route
          path="/perfiles/requisitos-perfil"
          element={<RequisitosPerfil />}
        />
        <Route path="/employees/profile" element={<EmployeeProfile />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
