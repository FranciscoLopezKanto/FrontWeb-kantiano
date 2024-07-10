// BasicTable.tsx

import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@aws-amplify/ui-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const BasicTable: React.FC<MedicosTableProps> = ({ medicos, onEdit }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);
  const [especialidad, setEspecialidad] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const handleEditClick = (medico: Medico) => {
    setSelectedMedico(medico);
    setEspecialidad(medico.especialidad);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedMedico(null);
    setEspecialidad("");
  };

  const handleSaveMedico = async () => {
    if (!selectedMedico) return;

    try {
      setIsSaving(true);

      const response = await fetch(`https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/auth/${selectedMedico.email}/editarperfilProfNS`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad: especialidad,
        }),
      });

      if (response.ok) {
        console.log("Especialidad actualizada correctamente");
        if (onEdit) {
          onEdit(selectedMedico.id);
        }
        toast.success("¡Especialidad actualizada correctamente!", {
          autoClose: 1500,
          onClose: () => {
            setShowModal(false);
            setTimeout(() => {
              window.location.href = "/tables";
            }, 0);
          },
        });
      } else {
        console.error("Error al actualizar la especialidad");
        toast.error("Error al actualizar la especialidad");
      }
    } catch (error) {
      console.error("Error al conectar con el backend", error);
      toast.error("Error al conectar con el backend");
    } finally {
      setIsSaving(false);
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
            <TableCell as="th">Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {medicos?.map((medico) => (
            <TableRow key={medico.id}>
              <TableCell>{medico.nombre}</TableCell>
              <TableCell>{medico.apellido}</TableCell>
              <TableCell>{medico.email}</TableCell>
              <TableCell>{medico.especialidad}</TableCell>
              <TableCell>
                <Button onClick={() => handleEditClick(medico)}>Editar</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Modal */}
      {selectedMedico && (
        <div className={`ModalBackground ${showModal ? 'show' : 'hide'}`}>
          <div className={`ModalContent ${showModal ? 'show' : 'hide'}`}>
            <h2>Editar Especialidad de Médico</h2>
            {selectedMedico && (
              <>
                <h3>{selectedMedico.nombre} {selectedMedico.apellido}</h3>
                <form>
                  <label>Especialidad:</label>
                  <select
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                  >
                    <option value="">Selecciona una opción</option>
                    <option value="Cardiología">Cardiología</option>
                    <option value="Cirugía">Cirugía</option>
                    <option value="Dermatología">Dermatología</option>
                    <option value="Infectología">Infectología</option>
                    <option value="Medicina Interna">Medicina Interna</option>
                  </select>
                  <div>
                    <button type="button" onClick={handleSaveMedico} disabled={isSaving}>
                      {isSaving ? 'Guardando...' : 'Guardar'}
                    </button>
                    <button type="button" onClick={handleCloseModal}>Cancelar</button>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      )}

      <ToastContainer />
    </>
  );
};

export default BasicTable;
