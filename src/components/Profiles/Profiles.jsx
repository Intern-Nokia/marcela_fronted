import { Divider, Table } from "antd";
import { useLocation } from "react-router-dom";
import "./profiles.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Courses from "../Courses/Courses";
import { Dotacion } from "../Dotacion/Dotacion";
import Exams from "../Exams/Exams";
import { Otros } from "../Otros/Otros";

export function Profiles({ employee }) {
  const location = useLocation();
  const state = location.state;

  return (
    <div
      style={{
        width: "75%",
        margin: "0 auto",
      }}
    >
      <Divider orientation="left">
        <h1>Requisitos perfil {state}</h1>
      </Divider>
      <Courses />

      <Dotacion />

      <Exams />

      <Otros />
    </div>
  );
}
