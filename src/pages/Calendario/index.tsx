import React, { useState } from 'react';
import FormComponent from './form';
import CalendarComponent from './Calendar';
import HorariosDisponiblesComponent from './HorariosDispo';

const CalendarioPage: React.FC = () => {
  const [step, setStep] = useState<'form' | 'calendar' | 'horarios'>('form');
  const [formData, setFormData] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [horariosDisponibles, setHorariosDisponibles] = useState<any[]>([]);

  const handleFormSubmit = (data: any) => {
    setFormData(data);
    setStep('calendar');
  };

  const handleDateSelect = (date: string, horarios: any[]) => {
    setSelectedDate(date);
    setHorariosDisponibles(horarios);
    setStep('horarios');
  };

  const handleReserva = async (hora: string, emailProfesional: string) => {
    try {
      const response = await fetch('https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/citas/agendar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad: formData.especialidad,
          tipoCita: formData.tipoCita,
          horarioPreferido: formData.horario,
          fechaSeleccionada: selectedDate,
          horaSeleccionada: hora,
          emailProfesional,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Consulta agendada con éxito');
        setStep('form');
        setFormData(null);
        setSelectedDate('');
        setHorariosDisponibles([]);
      } else {
        alert(data.message || 'Algo salió mal');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div>
      {step === 'form' && <FormComponent onSubmit={handleFormSubmit} />}
      {step === 'calendar' && formData && (
        <CalendarComponent
          fechasDisponibles={formData.fechasDisponibles}
          onDateSelect={handleDateSelect}
          formData={formData}
        />
      )}
      {step === 'horarios' && (
        <HorariosDisponiblesComponent
          selectedDate={selectedDate}
          horariosDisponibles={horariosDisponibles}
          onReserva={handleReserva}
        />
      )}
    </div>
  );
};

export default CalendarioPage;
