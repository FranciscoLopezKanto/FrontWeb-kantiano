import React, { useState } from "react";
import { Button, Flex, Text, TextField, SelectField } from "@aws-amplify/ui-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  nombre: string;
  apellido: string;
  email: string;
  password: string;
  especialidad: string;
}

const initialValues: FormValues = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  especialidad: "",
};

const BasicForm: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!values.nombre) newErrors.nombre = "Nombre es requerido.";
    if (!values.apellido) newErrors.apellido = "Apellido es requerido.";
    if (!values.email) newErrors.email = "Email es requerido.";
    if (!values.password) newErrors.password = "Contraseña es requerida.";
    if (values.password.length < 6) newErrors.password = "Contraseña debe tener al menos 6 caracteres.";
    if (!values.especialidad) newErrors.especialidad = "Especialidad es requerida.";
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

    try {
      const apiUrl = `${process.env.REACT_APP_URL}api/v1/auth/Mregister`;
      const payload = { ...values };
      console.log("Datos a enviar:", payload);
      console.log("URL de la API:", apiUrl);

      const response = await axios.post(apiUrl, payload);
      console.log("Registro exitoso:", response.data);
      toast.success("Registro exitoso");
      setTimeout(() => {
        window.location.href = "/";
      }, 1500);
    } catch (error) {
      console.error("Error en el registro:", error);
      toast.error("Error en el registro. Por favor, inténtelo de nuevo.");
    }
  };

  return (
    <>
      <ToastContainer />
      <Flex as="form" direction="column" width="100%" onSubmit={handleSubmit}>
        <TextField
          value={values.nombre}
          onChange={handleInputChange}
          name="nombre"
          label={
            <Text>
              Nombre
              <Text as="span" fontSize="0.8rem" color="red">
                (required)
              </Text>
            </Text>
          }
          type="text"
          isRequired={true}
          hasError={!!errors.nombre}
          errorMessage={errors.nombre}
        />
        <TextField
          value={values.apellido}
          onChange={handleInputChange}
          name="apellido"
          label="Apellido"
          type="text"
          hasError={!!errors.apellido}
          errorMessage={errors.apellido}
        />
        <TextField
          value={values.email}
          onChange={handleInputChange}
          name="email"
          label={
            <Text>
              Email
              <Text as="span" fontSize="0.8rem" color="red">
                (required)
              </Text>
            </Text>
          }
          type="email"
          isRequired={true}
          hasError={!!errors.email}
          errorMessage={errors.email}
        />
        <div style={{ position: "relative", width: "100%" }}>
          <TextField
            value={values.password}
            onChange={handleInputChange}
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            style={{ paddingRight: "40px" }} // Para dejar espacio para el botón en la esquina derecha
            hasError={!!errors.password}
            errorMessage={errors.password}
          />
          <Button
            onClick={handleTogglePassword}
            style={{ position: "absolute", top: "0%", right: "0px", transform: "translateY(76%)" }}
          >
            {showPassword ? "Hide" : "Show"}
          </Button>
        </div>
        <SelectField
          value={values.especialidad}
          onChange={handleInputChange}
          name="especialidad"
          label="Especialidad"
          isRequired={true}
          hasError={!!errors.especialidad}
          errorMessage={errors.especialidad}
        >
          <option value="">Select an option</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Cirugía">Cirugía</option>
          <option value="Dermatología">Dermatología</option>
          <option value="Infectología">Infectología</option>
          <option value="Medicina Interna">Medicina Interna</option>
        </SelectField>
        <Button
          type="submit"
          variation="primary"
          width={{ base: "100%", large: "50%" }}
          style={{ marginLeft: "auto" }}
        >
          Registrar Medico
        </Button>
      </Flex>
    </>
  );
};

export default BasicForm;