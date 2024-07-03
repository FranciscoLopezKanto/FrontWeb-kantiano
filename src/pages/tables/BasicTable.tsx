import React from "react";
import { Table, TableBody, TableCell, TableHead, TableRow } from "@aws-amplify/ui-react";

import "./Table.css";

export interface Medico {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  especialidad: string;
}

export interface MedicosTableProps {
  medicos?: Medico[];
}

const BasicTable = (props: MedicosTableProps) => {
  const { medicos } = props;

  return (
    <>
      <Table caption="" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Nombre</TableCell>
            <TableCell as="th">Apellido</TableCell>
            <TableCell as="th">Email</TableCell>
            <TableCell as="th">Especialidad</TableCell>
            <TableCell as="th">Imagen</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicos?.map((medico) => {
            return (
              <TableRow key={medico.id}>
                <TableCell>{medico.nombre}</TableCell>
                <TableCell>{medico.apellido}</TableCell>
                <TableCell>{medico.email}</TableCell>
                <TableCell>{medico.especialidad}</TableCell>
                <TableCell>
                  <img
                    className="medico-table-img"
                    src={`https://i.pravatar.cc/50?img=${medico.id}`}
                    alt="profile"
                  ></img>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default BasicTable;