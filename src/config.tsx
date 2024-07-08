import React from "react";
import { Icon } from "@aws-amplify/ui-react";
import {
  MdDashboard,
  MdModeEditOutline,
  MdAccountBox,
  MdOutlineTableChart,
  MdEditCalendar,
} from "react-icons/md";

// Configuración base común para todas las configuraciones de navegación
export const baseConfig = {
  projectLink: "/", // Enlace a GitHub en la barra de navegación
  docsRepositoryBase: "", // URL base del repositorio de documentación
  titleSuffix: "",
  search: true,
  header: true,
  headerText: "KantiMed",
  footer: true,
  footerText: (
    <>
      <span>
        © MIT {new Date().getFullYear()}, Hecho con ❤️ por {""}
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

//navegación para diferentes tipos de usuario
export const getAppNavs = (userType: string | null) => {
  console.log(userType);
  if (userType === "profesional") {
    // Configuración de navegación para profesionales (osea quitandole mas cosas respecto a secretaria)
    return [
      {
        eventKey: "dashboard",
        icon: <Icon as={MdDashboard} />,
        title: "Dashboard",
        to: "/",
      },
      {
        eventKey: "tables",
        icon: <Icon as={MdOutlineTableChart} />,
        title: "Personas",
        to: "/tables",
        children: [
          {
            eventKey: "users",
            title: "Pacientes",
            to: "/users-table",
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
  } else {
    // Configuración de navegación para otros tipos de usuario
    return [
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
            to: "/calendario",
          },
        ],
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
  }
};

export default getAppNavs;