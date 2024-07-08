import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

type CalendarComponentProps = {
  fechasDisponibles: string[];
  onDateSelect: (date: string, horariosDisponibles: any[]) => void;
  formData: any;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ fechasDisponibles, onDateSelect, formData }) => {
  const handleDayPress = async (date: Date) => {
    const selectedDate = date.toISOString().split('T')[0];

    try {
      const response = await fetch('https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/citas/buscarH', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad: formData.especialidad,
          tipoCita: formData.tipoCita,
          horarioPreferido: formData.horario,
          fechaSeleccionada: selectedDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onDateSelect(selectedDate, data.horariosDisponibles);
      } else {
        alert(data.message || 'Algo salió mal');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Selecciona una Fecha</h2>
      <Calendar
        onClickDay={handleDayPress}
        tileDisabled={({ date }) => !fechasDisponibles.includes(date.toISOString().split('T')[0])}
      />
    </div>
  );
};

export default CalendarComponent;
