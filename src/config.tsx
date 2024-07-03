import React from "react";
import { Icon } from "@aws-amplify/ui-react";

import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
  MdEditCalendar,
} from "react-icons/md";

export const baseConfig = {
  projectLink: "/", // GitHub link in the navbar
  docsRepositoryBase: "", // base URL for the docs repository
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "KantiMed",
  footer: true,
  footerText: (
    <>
      <span>
        © MIT {new Date().getFullYear()}, Made with ❤️ by {""}
        <a href="https://github.com/franciscolopezkanto" target="_blank" rel="noreferrer">
          Kanto
        </a>
      </span>
    </>
  ),

  logo: (
    <>
      <img
        src={process.env.PUBLIC_URL + "/logo.png"}
        alt="logo"
        width="30"
        height="22"
      />
    </>
  ),
};

/// Navigation sidebar
export const appNavs = [
  {
    eventKey: "dashboard",
    icon: <Icon as={MdDashboard} />,
    title: "Dashboard",
    to: "/",
  },
  {
    eventKey: "Reservas",
    icon: <Icon as={MdEditCalendar} />,
    title: "Reservas",
    to: "/",
    children: [
      {
        eventKey: "basic-table",
        title: "Crear Reserva",
        to: "/tables",
      },
      

  ]
  },

  {
    eventKey: "tables",
    icon: <Icon as={MdOutlineTableChart} />,
    title: "Personas",
    to: "/tables",
    children: [
      {
        eventKey: "basic-table",
        title: "Doctores",
        to: "/tables",
      },
      {
        eventKey: "users",
        title: "Pacientes",
        to: "/users-table",
      },
    ],
  },
  {
    eventKey: "forms",
    icon: <Icon as={MdModeEditOutline} />,
    title: "Ingresos",
    to: "/forms",
    children: [
      {
        eventKey: "form-basic",
        title: "Agregar Paciente",
        to: "/forms",
      },
      {
        eventKey: "form-basic2",
        title: "Agregar Médico",
        to: "/forms2",
      },
      {
        eventKey: "form-wizard",
        title: "Edit Form",
        to: "/edit-form",
      },
    ],
  },
  {
    eventKey: "profile",
    icon: <Icon as={MdAccountBox} />,
    title: "Perfil",
    to: "/profile",
  },
];
