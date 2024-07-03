import React from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
} from "@aws-amplify/ui-react";
import "./UserTable.css";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  seguroMedico: string;
  rut:string;
}

export interface UsersTableProps {
  users?: User[];
}

const UsersTable = (props: UsersTableProps) => {
  const { users } = props;

  return (
    <>
      <Table caption="" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Nombre</TableCell>
            <TableCell as="th">Apellido</TableCell>
            <TableCell as="th">Rut</TableCell>
            <TableCell as="th">Dirección</TableCell>
            <TableCell as="th">Seguro Médico</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.apellido}</TableCell>
                <TableCell>{item.rut}</TableCell>
                <TableCell>{item.direccion}</TableCell>
                <TableCell>{item.seguroMedico}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
