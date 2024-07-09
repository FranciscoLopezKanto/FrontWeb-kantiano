import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CustomCalendar.css';

type CalendarComponentProps = {
  fechasDisponibles: string[];
  onDateSelect: (date: string, horariosDisponibles: any[]) => void;
  formData: any;
};

const CalendarComponent: React.FC<CalendarComponentProps> = ({ fechasDisponibles, onDateSelect, formData }) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const handleDateChange = async (date: Date | null) => {
    if (!date) return;

    setSelectedDate(date);
    const formattedDate = date.toISOString().split('T')[0];

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
          fechaSeleccionada: formattedDate,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onDateSelect(formattedDate, data.horariosDisponibles);
      } else {
        alert(data.message || 'Algo salió mal');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  const containerStyle: React.CSSProperties = {
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
    border: '1px solid #00bfff',
    borderRadius: '10px',
    backgroundColor: '#e0f7ff',
    maxWidth: '400px',
    margin: '50px auto 0 auto',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const headerStyle: React.CSSProperties = {
    textAlign: 'center',
    color: '#007acc',
    marginBottom: '20px',
    fontSize: '24px',
  };

  const datePickerContainerStyle: React.CSSProperties = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headerStyle}>Selecciona una Fecha</h2>
      <div style={datePickerContainerStyle}>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          includeDates={fechasDisponibles.map(date => {
            const utcDate = new Date(date);
            const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
            return localDate;
          })}
          inline
          calendarClassName="my-datepicker"
        />
      </div>
    </div>
  );
};

export default CalendarComponent;