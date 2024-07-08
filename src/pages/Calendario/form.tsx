import React, { useState } from 'react';

type FormComponentProps = {
  onSubmit: (data: any) => void;
};

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [especialidad, setEspecialidad] = useState<string>('');
  const [tipoCita, setTipoCita] = useState<string>('');
  const [horario, setHorario] = useState<string>('mañana');

  const especialidades = [
    { label: 'Cardiología', value: 'Cardiología' },
    { label: 'Dermatología', value: 'Dermatología' },
    { label: 'Neurología', value: 'Neurología' },
    { label: 'Pediatría', value: 'Pediatría' },
    { label: 'Infectología', value: 'Infectología' },
    { label: 'Cirugía', value: 'Cirugía' },
    { label: 'Medicina Interna', value: 'Medicina Interna' },
  ];

  const tiposCita = [
    { label: 'Consulta', value: 'Consulta' },
    { label: 'Revisión', value: 'Revisión' },
  ];

  const handleFormSubmit = async () => {
    if (!especialidad || !tipoCita) {
      alert('Por favor, completa todos los campos.');
      return;
    }

    try {
      const response = await fetch('https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/citas/buscarD', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          especialidad,
          tipoCita,
          horarioPreferido: horario,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onSubmit({
          especialidad,
          tipoCita,
          horario,
          fechasDisponibles: data.fechasDisponibles,
        });
      } else {
        alert(data.message || 'Algo salió mal');
      }
    } catch (error) {
      alert('No se pudo conectar con el servidor');
    }
  };

  return (
    <div>
      <h2>Formulario de Citas</h2>
      <div>
        <label>
          Especialidad
          <select
            value={especialidad}
            onChange={(e) => setEspecialidad(e.target.value)}
          >
            <option value="" disabled>Selecciona una especialidad</option>
            {especialidades.map((esp) => (
              <option key={esp.value} value={esp.value}>{esp.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Tipo de Cita
          <select
            value={tipoCita}
            onChange={(e) => setTipoCita(e.target.value)}
          >
            <option value="" disabled>Selecciona un tipo de cita</option>
            {tiposCita.map((tipo) => (
              <option key={tipo.value} value={tipo.value}>{tipo.label}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label>
          Horario
          <div>
            <label>
              <input
                type="radio"
                value="mañana"
                checked={horario === 'mañana'}
                onChange={(e) => setHorario(e.target.value)}
              />
              Mañana
            </label>
            <label>
              <input
                type="radio"
                value="tarde"
                checked={horario === 'tarde'}
                onChange={(e) => setHorario(e.target.value)}
              />
              Tarde
            </label>
          </div>
        </label>
      </div>
      <button onClick={handleFormSubmit}>Enviar</button>
    </div>
  );
};

export default FormComponent;
