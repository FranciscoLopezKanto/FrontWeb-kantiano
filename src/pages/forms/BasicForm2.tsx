import React, { useState } from "react";
import { Button, Flex, Text, TextField, SelectField } from "@aws-amplify/ui-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
  nombre: string;
  email: string;
  password: string;
  tipoUsuario: string;
  edad: number; // Cambiado a number
  apellido: string;
  direccion: string;
  rut: string;
  seguroMedico: string;
}

const initialValues: FormValues = {
  nombre: "",
  apellido: "",
  email: "",
  password: "",
  tipoUsuario: "cliente",
  edad: 0, // Valor inicial como número
  direccion: "",
  rut: "",
  seguroMedico: "",
};

const BasicForm2: React.FC = () => {
  const [values, setValues] = useState<FormValues>(initialValues);
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: name === "edad" ? parseInt(value, 10) : value, // Convertir edad a número
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
    if (!values.edad) newErrors.edad = "Edad es requerida.";
    if (!values.direccion) newErrors.direccion = "Dirección es requerida.";
    if (!values.rut) newErrors.rut = "RUT es requerido.";
    if (!values.seguroMedico) newErrors.seguroMedico = "Seguro Médico es requerido.";
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
      const apiUrl = `${process.env.REACT_APP_URL}api/v1/auth/register`;
      console.log(values);
      const response = await axios.post(apiUrl, values);
      
      console.log("Registro exitoso:", response.data);
      toast.success("Registro exitoso");
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
        <TextField
          value={values.edad}
          onChange={handleInputChange}
          name="edad"
          label="Edad"
          type="number"
          hasError={!!errors.edad}
          errorMessage={errors.edad}
        />
        <TextField
          value={values.direccion}
          onChange={handleInputChange}
          name="direccion"
          label="Dirección"
          type="text"
          hasError={!!errors.direccion}
          errorMessage={errors.direccion}
        />
        <TextField
          value={values.rut}
          onChange={handleInputChange}
          name="rut"
          label="RUT"
          type="text"
          hasError={!!errors.rut}
          errorMessage={errors.rut}
        />
        <SelectField
          value={values.seguroMedico}
          onChange={handleInputChange}
          name="seguroMedico"
          label="Seguro Médico"
          isRequired={true}
          hasError={!!errors.seguroMedico}
          errorMessage={errors.seguroMedico}
        >
          <option value="">Select an option</option>
          <option value="fonasa">Fonasa</option>
          <option value="isapre">Isapre</option>
        </SelectField>
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
        <Button
          type="submit"
          variation="primary"
          width={{ base: "100%", large: "50%" }}
          style={{ marginLeft: "auto" }}
        >
          Registrar Paciente
        </Button>
      </Flex>
    </>
  );
};

export default BasicForm2;