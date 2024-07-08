import React from 'react';

type HorariosDisponiblesComponentProps = {
  selectedDate: string;
  horariosDisponibles: any[];
  onReserva: (hora: string, emailProfesional: string) => void;
};

const HorariosDisponiblesComponent: React.FC<HorariosDisponiblesComponentProps> = ({
  selectedDate,
  horariosDisponibles,
  onReserva,
}) => {
  return (
    <div>
      <h2>Horarios Disponibles para {selectedDate}</h2>
      <ul>
        {horariosDisponibles.map((horario, index) => (
          <li key={index}>
            {horario.hora} - {horario.profesional}
            <button onClick={() => onReserva(horario.hora, horario.emailProfesional)}>
              Reservar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HorariosDisponiblesComponent;
