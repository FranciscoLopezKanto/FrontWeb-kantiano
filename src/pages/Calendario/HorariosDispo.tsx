import React, { useState } from 'react';
import Modal from 'react-modal';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HorariosDisponibles.css';

Modal.setAppElement('#root');

type HorariosDisponiblesComponentProps = {
  selectedDate: string;
  horariosDisponibles: any[];
};

const HorariosDisponiblesComponent: React.FC<HorariosDisponiblesComponentProps> = ({
  selectedDate,
  horariosDisponibles,
}) => {
  const [contactoUsuario, setContactoUsuario] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [selectedHora, setSelectedHora] = useState<string>('');
  const [selectedDoctor, setSelectedDoctor] = useState<string>('');
  const [selectedEmailProfesional, setSelectedEmailProfesional] = useState<string>('');

  const openModal = (hora: string, doctor: string, emailProfesional: string) => {
    setSelectedHora(hora);
    setSelectedDoctor(doctor);
    setSelectedEmailProfesional(emailProfesional);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setContactoUsuario('');
  };

  const handleReserva = async () => {
    const pacienteEmailLowercase = contactoUsuario.toLowerCase();
    const cita = {
      fecha: selectedDate,
      hora: selectedHora,
      tipoReserva: 'Consulta',
      estado: 'Pendiente',
      pacienteEmail: pacienteEmailLowercase,
      profesionalEmail: selectedEmailProfesional,
    };

    try {
      console.log(JSON.stringify(cita));
      const response = await fetch('https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/citas/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cita),
      });

      if (response.ok) {
        toast.success(`Reserva confirmada con el Dr. ${selectedDoctor} a las ${selectedHora} hrs`);
        closeModal();
        setTimeout(() => {
          window.location.href = "/";
        }, 3000);
      } else {
        toast.error('Error al agendar cita. Por favor intenta nuevamente más tarde');
      }
    } catch (error) {
      console.error('Error al procesar la solicitud:', error);
      toast.error('Hubo un problema al intentar agendar la cita');
    }
  };

  // Descomponer la fecha seleccionada
  const fecha = new Date(selectedDate);
  const dia = fecha.getDate();
  const mes = fecha.toLocaleString('default', { month: 'long' });
  const año = fecha.getFullYear();

  return (
    <div className="horarios-container">
      <h2 className="horarios-header">Horarios Disponibles para {dia} de {mes} de {año}</h2>
      <ul className="horarios-list">
        {horariosDisponibles.map((horario, index) => (
          <li key={index} className="horarios-item">
            <div className="horarios-info">
              <span className="horarios-hora">{horario.hora}</span>
              <span className="horarios-profesional"> Dr.{horario.doctor}</span>
            </div>
            <button className="horarios-button" onClick={() => openModal(horario.hora, horario.doctor, horario.email)}>
              Reservar
            </button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Reservar Horario"
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <h2>Ingrese el correo electrónico del paciente</h2>
        <input
          type="email"
          value={contactoUsuario}
          onChange={(e) => setContactoUsuario(e.target.value)}
          placeholder="Correo electrónico"
        />
        <button onClick={handleReserva}>Reservar</button>
        <button onClick={closeModal}>Cancelar</button>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default HorariosDisponiblesComponent;