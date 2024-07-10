import React, { ReactNode, useState } from "react";
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
} from "@aws-amplify/ui-react";
import "./UserTable.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export interface User {
  email: ReactNode;
  id: number;
  nombre: string;
  apellido: string;
  direccion: string;
  seguroMedico: string;
  correo: string;
  rut: string;
}

export interface UsersTableProps {
  users?: User[];
  onEdit?: (id: number) => void;
}

const UsersTable: React.FC<UsersTableProps> = (props) => {
  const { users, onEdit } = props;
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [insurance, setInsurance] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (user: User) => {
    setSelectedUser(user);
    setInsurance(user.seguroMedico);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
    setInsurance('');
  };

  const handleSave = async () => {
    if (!selectedUser) return;

    try {
      setIsSaving(true);
      console.log(insurance);
      const response = await fetch(`https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/auth/${selectedUser.email}/editarperfilNS`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          seguroMedico: insurance,
        }),
      });

      if (response.ok) {
        // Muestra un toast de éxito
        toast.success('¡Seguro médico actualizado correctamente!', {
          autoClose: 1500,
          onClose: () => {
            if (onEdit) {
              onEdit(selectedUser.id);
            }
            setIsSaving(false);
            handleCloseModal();
            setTimeout(() => {
              window.location.href = "/users-table";
            }, 2000);
          }
        });
      } else {
        console.error('Error al actualizar el seguro médico');
      }
    } catch (error) {
      console.error('Error al conectar con el backend', error);
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
            <TableCell as="th">Acciones</TableCell>
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
                  <Button onClick={() => handleEditClick(item)}>Editar</Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Modal */}
      {selectedUser && (
        <div className={`ModalBackground ${showModal ? 'show' : 'hide'}`}>
          <div className={`ModalContent ${showModal ? 'show' : 'hide'}`}>
            <h2>Editar Seguro Médico</h2>
              <h3>{selectedUser.nombre} {selectedUser.apellido}</h3>
            <form>
              <label>
                Seguro Médico:
                <select value={insurance} onChange={(e) => setInsurance(e.target.value)}>
                  <option value="Fonasa">Fonasa</option>
                  <option value="Isapre">Isapre</option>
                </select>
              </label>
              <div>
                <button type="button" onClick={handleCloseModal}>Cancelar</button>
                <button type="button" onClick={handleSave} disabled={isSaving}>{isSaving ? 'Guardando...' : 'Guardar'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Toast Container */}
      <ToastContainer />
    </>
  );
};

export default UsersTable;
