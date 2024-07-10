import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button } from '@aws-amplify/ui-react';
import Modal from 'react-modal';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './verCitas.css';

interface Cita {
    id: number;
    fecha: string;
    hora: string;
    tipoReserva: string;
    estado: string;
    profesional?: {
        id: number;
        nombre: string;
        apellido: string;
        especialidad: string;
    };
}

const CitasPendientesTable = () => {
    const [citas, setCitas] = useState<Cita[]>([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedCita, setSelectedCita] = useState<Cita | null>(null);
    const [includeFinalizadas, setIncludeFinalizadas] = useState(false); // Estado para incluir citas finalizadas
    const token = localStorage.getItem('token');
    const apiUrl = 'https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1';

    const fetchCitas = useCallback(async () => {
        try {
            const endpoint = includeFinalizadas ? `${apiUrl}/citas/todasP` : `${apiUrl}/citas/pendientes`;
            const response = await fetch(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.ok) {
                const data = await response.json();
                setCitas(data);
            } else {
                console.error('Error al obtener citas:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    }, [token, includeFinalizadas, apiUrl]);

    useEffect(() => {
        fetchCitas();
    }, [fetchCitas]);

    const handleEditClick = (cita: Cita) => {
        setSelectedCita(cita);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedCita(null);
    };

    const handleConfirmClick = async () => {
        if (!selectedCita) return;

        try {
            const response = await axios.put(`${apiUrl}/citas/${selectedCita.id}/estado`, {
                estado: 'confirmada',
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                toast.success('Cita actualizada con éxito');
                fetchCitas(); // Vuelve a cargar las citas
                closeModal();
                setTimeout(() => { window.location.href = '/miscitas'; }, 2000);
            } else {
                toast.error('Error al actualizar la cita');
            }
        } catch (error) {
            console.error('Error al actualizar la cita:', error);
            toast.error('Error al actualizar la cita');
        }
    };

    return (
        <>
            <div className="toggle-container">
                <label>
                    <input
                        type="checkbox"
                        checked={includeFinalizadas}
                        onChange={() => setIncludeFinalizadas(!includeFinalizadas)}
                    />
                    Incluir citas finalizadas
                </label>
            </div>

            <Table caption="Citas Pendientes y Finalizadas" highlightOnHover={true}>
                <TableHead>
                    <TableRow>
                        <TableCell as="th">Fecha</TableCell>
                        <TableCell as="th">Hora</TableCell>
                        <TableCell as="th">Tipo de Reserva</TableCell>
                        <TableCell as="th">Estado</TableCell>
                        <TableCell as="th">Profesional</TableCell>
                        <TableCell as="th">Acciones</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {citas.map((cita) => (
                        <TableRow key={cita.id}>
                            <TableCell>{cita.fecha}</TableCell>
                            <TableCell>{cita.hora}</TableCell>
                            <TableCell>{cita.tipoReserva}</TableCell>
                            <TableCell>{cita.estado}</TableCell>
                            <TableCell>
                                {cita.profesional ? (
                                    `${cita.profesional.nombre || ''} ${cita.profesional.apellido || ''} - ${cita.profesional.especialidad || ''}`
                                ) : (
                                    'N/A'
                                )}
                            </TableCell>
                            <TableCell>
                                <Button onClick={() => handleEditClick(cita)}>Editar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal de edición */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Editar Cita"
                className="ModalContent"
                overlayClassName="ModalBackground"
            >
                <button className="close-button" onClick={closeModal}>&times;</button>
                <div className="modal-header">
                    <h2>Editar Cita</h2>
                </div>
                {selectedCita && (
                    <div className="modal-body">
                        <p><strong>Fecha:</strong> {selectedCita.fecha}</p>
                        <p><strong>Hora:</strong> {selectedCita.hora}</p>
                        <p><strong>Tipo de Reserva:</strong> {selectedCita.tipoReserva}</p>
                        <p><strong>Estado:</strong> {selectedCita.estado}</p>
                        <p><strong>Profesional:</strong> {selectedCita.profesional?.nombre} {selectedCita.profesional?.apellido}</p>
                    </div>
                )}
                <div className="modal-buttons">
                    <Button className="button-confirmar" onClick={handleConfirmClick}>
                        Confirmar
                    </Button>
                    <Button className="button-cancelar" onClick={closeModal}>
                        Cancelar
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default CitasPendientesTable;