import React, { useState, useEffect, ReactNode } from "react";
import { Button, Flex, Text, SelectField } from "@aws-amplify/ui-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { DateRangePicker, RangeKeyDict, Range, createStaticRanges } from 'react-date-range';
import { addDays, format, endOfMonth } from 'date-fns';
import { es } from 'date-fns/locale';
import 'react-toastify/dist/ReactToastify.css';
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file

interface FormValues {
  horaInicio: string;
  horaFin: string;
  emailDoctor: string;
}

const initialValues: FormValues = {
  horaInicio: "",
  horaFin: "",
  emailDoctor: "",
};

const HorasForm: React.FC = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [doctores, setDoctores] = useState<{
    apellido: ReactNode;
    especialidad: ReactNode; id: number; nombre: string; email: string 
  }[]>([]);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: tomorrow,
      endDate: addDays(tomorrow, 6),
      key: 'selection'
    }
  ]);

  useEffect(() => {
    const fetchDoctores = async () => {
      try {
        const response = await axios.get("https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/profesionales");
        setDoctores(response.data);
      } catch (error) {
        console.error("Error al obtener doctores:", error);
        toast.error("Error al obtener doctores.");
      }
    };

    fetchDoctores();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.horaInicio) newErrors.horaInicio = "Hora de inicio es requerida.";
    if (!values.horaFin) newErrors.horaFin = "Hora de fin es requerida.";
    if (!values.emailDoctor) newErrors.emailDoctor = "Email del doctor es requerido.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Object.values(validationErrors).forEach((error) => toast.error(error));
      return;
    }

    const { startDate, endDate } = dateRange[0];
    const currentDate = new Date(startDate as Date);
    const formattedEndDate = new Date(endDate as Date);

    try {
      const apiUrl = `https://refactored-space-goggles-qgg469qvxqqfjqv-3000.app.github.dev/api/v1/com`;

      while (currentDate <= formattedEndDate) {
        const payload = {
          fecha: format(currentDate, 'yyyy-MM-dd'),
          horaInicio: values.horaInicio,
          horaFin: values.horaFin,
          emailDoctor: values.emailDoctor
        };
        console.log(payload);
        const response = await axios.post(apiUrl, payload);
        console.log("Horas agregadas exitosamente:", response.data);

        // Avanzar al siguiente día
        currentDate.setDate(currentDate.getDate() + 1);
      }
      toast.success("Horas agregadas exitosamente");
      setTimeout(() => {
        window.location.href = "/";
      }, 3000);
    } catch (error) {
      console.error("Error al agregar horas:", error);
      toast.error("Error al agregar horas. Por favor, inténtelo de nuevo.");
    }
  };

  const handleDateRangeChange = (ranges: RangeKeyDict) => {
    const { selection } = ranges;
    setDateRange([selection]);
  };

  const horasDisponibles = Array.from({ length: 11 }, (_, i) => {
    const hora = 8 + i;
    const horaInicio = `${hora.toString().padStart(2, '0')}:00`;
    const horaFin = `${(hora + 1).toString().padStart(2, '0')}:00`;
    return { horaInicio, horaFin };
  });

  const customStaticRanges = createStaticRanges([
    {
      label: 'Una Semana',
      range: () => ({
        startDate: addDays(tomorrow, 0),
        endDate: addDays(tomorrow, 6)
      }),
    },
    {
      label: 'Resto del Mes',
      range: () => ({
        startDate: tomorrow,
        endDate: endOfMonth(new Date())
      }),
    }
  ]);

  return (
    <>
      <ToastContainer />
      <Flex as="form" direction="column" width="100%" onSubmit={handleSubmit}>
        <SelectField
          value={values.emailDoctor}
          onChange={handleInputChange}
          name="emailDoctor"
          label="Seleccionar Doctor"
          hasError={!!errors.emailDoctor}
          errorMessage={errors.emailDoctor}
          isRequired
        >
          <option value="">Seleccione un doctor</option>
          {doctores.map((doctor) => (
            <option key={doctor.id} value={doctor.email}>
              {doctor.nombre} {doctor.apellido} ({doctor.especialidad})
            </option>
          ))}
        </SelectField>
        <SelectField
          value={values.horaInicio}
          onChange={handleInputChange}
          name="horaInicio"
          label="Hora de Inicio"
          hasError={!!errors.horaInicio}
          errorMessage={errors.horaInicio}
          isRequired
        >
          <option value="">Seleccione la hora de inicio</option>
          {horasDisponibles.map(({ horaInicio }) => (
            <option key={horaInicio} value={horaInicio}>
              {horaInicio}
            </option>
          ))}
        </SelectField>
        <SelectField
          value={values.horaFin}
          onChange={handleInputChange}
          name="horaFin"
          label="Hora de Fin"
          hasError={!!errors.horaFin}
          errorMessage={errors.horaFin}
          isRequired
        >
          <option value="">Seleccione la hora de fin</option>
          {horasDisponibles.map(({ horaFin }) => (
            <option key={horaFin} value={horaFin}>
              {horaFin}
            </option>
          ))}
        </SelectField>
        <div>
          <Text>Seleccionar rango de fechas</Text>
          <DateRangePicker
            ranges={dateRange}
            onChange={handleDateRangeChange}
            locale={es}
            minDate={tomorrow}
            staticRanges={customStaticRanges}
          />
        </div>
        <Button
          type="submit"
          variation="primary"
          width={{ base: "100%", large: "50%" }}
          style={{ marginLeft: "auto" }}
        >
          Agregar Horas
        </Button>
      </Flex>
    </>
  );
};

export default HorasForm;
