import React, { useEffect, useState, useCallback } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@aws-amplify/ui-react';
import Modal from 'react-modal';
import './verCitas.css'; // Importa el archivo CSS

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
    let doctor;
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

    const handleFinalizarCita = async (id: number) => {
        try {
            const response = await fetch(`${apiUrl}/citas/${id}/estado`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    estado: 'Finalizada',
                }),
            });
            if (response.ok) {
                console.log(`Cita finalizada correctamente.`);
                const updatedCitas = citas.filter(cita => cita.id !== id);
                setCitas(updatedCitas);
                openModal(); // Abrir el modal de confirmación
            } else {
                console.error('Error al finalizar la cita:', response.statusText);
            }
        } catch (error) {
            console.error('Error en la conexión:', error);
        }
    };

    const openModal = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
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
                                    doctor
                                )}
                            </TableCell>
                            <TableCell>
                                <button className="button-finalizar" onClick={() => {
                                    setSelectedCita(cita);
                                    openModal(); // Abrir modal al hacer clic en Finalizar
                                }}>
                                    Finalizar
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            {/* Modal de confirmación */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Confirmar Finalización de Cita"
                style={{
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    },
                }}
            >
                <div className="modal-header">
                    <h2>Confirmar Finalización de Cita</h2>
                </div>
                {selectedCita && (
                    <div className="modal-content">
                        <p><strong>Fecha:</strong> {selectedCita.fecha}</p>
                        <p><strong>Hora:</strong> {selectedCita.hora}</p>
                        <p><strong>Tipo de Reserva:</strong> {selectedCita.tipoReserva}</p>
                        <p><strong>Estado:</strong> {selectedCita.estado}</p>
                        <p><strong>Profesional:</strong> {selectedCita.profesional?.nombre} {selectedCita.profesional?.apellido}</p>
                    </div>
                )}
                <div className="modal-buttons">
                    <button className="button-confirmar" onClick={() => {
                        handleFinalizarCita(selectedCita?.id || 0);
                        closeModal();
                    }}>
                        Confirmar
                    </button>
                    <button className="button-cancelar" onClick={closeModal}>
                        Cancelar
                    </button>
                </div>
            </Modal>
        </>
    );
};

export default CitasPendientesTable;