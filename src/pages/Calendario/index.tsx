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

  const handleDateSelect = async (date: string) => {
    setSelectedDate(date);

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
          fechaSeleccionada: date,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setHorariosDisponibles(data.horariosDisponibles);
        setStep('horarios');
      } else {
        alert(data.message || 'Algo salió mal');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };


  const handleBack = () => {
    if (step === 'horarios') {
      setStep('calendar');
    } else if (step === 'calendar') {
      setStep('form');
    }
  };

  return (
    <div>
      {step !== 'form' && <button onClick={handleBack}>Atrás</button>}
      {step === 'form' && <FormComponent onSubmit={handleFormSubmit} />}
      {step === 'calendar' && (
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
        />
      )}
    </div>
  );
};

export default CalendarioPage;