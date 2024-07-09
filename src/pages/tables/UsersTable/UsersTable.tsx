import React from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
} from "@aws-amplify/ui-react";
import "./UserTable.css";

export interface User {
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  seguroMedico: string;
  email:string;
  rut: string;
}

export interface UsersTableProps {
  users?: User[];
  onEdit?: (id: number) => void; 
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
  const { users, onEdit } = props;

  const handleEditClick = (id: number) => {
    if (onEdit) {
      onEdit(id);
    }
  };

  return (
    <>
      <Table caption="" highlightOnHover={false}>
        <TableHead>
          <TableRow>
            <TableCell as="th">Nombre</TableCell>
            <TableCell as="th">Apellido</TableCell>
            <TableCell as="th">Correo</TableCell>
            <TableCell as="th">Dirección</TableCell>
            <TableCell as="th">Seguro Médico</TableCell>
            <TableCell as="th">Acciones</TableCell> {/* Columna para acciones */}
          </TableRow>
        </TableHead>
        <TableBody>
          {users?.map((item) => {
            return (
              <TableRow key={item.id}>
                <TableCell>{item.nombre}</TableCell>
                <TableCell>{item.apellido}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.direccion}</TableCell>
                <TableCell>{item.seguroMedico}</TableCell>
                <TableCell>
                  <Button onClick={() => handleEditClick(item.id)}>Editar</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UsersTable;
