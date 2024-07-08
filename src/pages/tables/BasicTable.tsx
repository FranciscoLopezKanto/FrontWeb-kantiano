import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@aws-amplify/ui-react";

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
  onEdit?: (id: number) => void; // Función para manejar la edición de un médico
}

const BasicTable: React.FC<MedicosTableProps> = (props) => {
  const { medicos, onEdit } = props;

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
            <TableCell as="th">Email</TableCell>
            <TableCell as="th">Especialidad</TableCell>
            <TableCell as="th">Imagen</TableCell>
            <TableCell as="th">Acciones</TableCell> {/* Columna para acciones */}
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
                <TableCell>
                  <Button onClick={() => handleEditClick(medico.id)}>Editar</Button>
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