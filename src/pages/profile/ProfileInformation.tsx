import React, { useEffect, useState } from "react";
import { Flex, Text, Button, TextField,SelectField } from "@aws-amplify/ui-react";
import Modal from 'react-modal';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

Modal.setAppElement('#root'); // Especifica el elemento raíz de tu aplicación

const ProfileInformation = () => {
  const [userInfo, setUserInfo] = useState({
    nombre: "",
    apellido: "",
    email: "",
    tipoUsuario: "",
    especialidad: "",
  });

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    email: "",
    especialidad: "",
    password: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      const userId = tokenPayload.id;
      console.log(tokenPayload);

      const userEndpoint =
        userType === "profesional"
          ? `${process.env.REACT_APP_URL}api/v1/profesionales/${userId}`
          : `${process.env.REACT_APP_URL}api/v1/secretarias/${userId}`;

      axios
        .get(userEndpoint, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setUserInfo(response.data);
          setEditForm({
            email: response.data.email,
            especialidad: response.data.especialidad || "",
            password: "",
          });
        })
        .catch((error) => {
          console.error("Error al obtener la información del usuario:", error);
        });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const userType = localStorage.getItem("userType");

    if (editForm.password.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres");
      return;
    }
    
    if (token) {

      const editEndpoint =
        userType === "profesional"
          ? `${process.env.REACT_APP_URL}api/v1/auth/editarperfil/profesional`
          : `${process.env.REACT_APP_URL}api/v1/auth/editarperfil/secretaria`;

      // Crear un objeto con solo los campos modificados
      const updatedData = {
        email: editForm.email !== userInfo.email ? editForm.email : undefined,
        especialidad: userType === "profesional" && editForm.especialidad !== userInfo.especialidad ? editForm.especialidad : undefined,
        password: editForm.password ? editForm.password : undefined,
      };
      
      axios
        .patch(editEndpoint, updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          toast.success("Perfil actualizado con éxito");
          setUserInfo(response.data);
          setEditModalOpen(false);
          // Recargar la página después de un breve retraso para permitir que el toast se muestre
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        })
        .catch((error) => {
          console.error("Error al editar la información del usuario:", error);
          toast.error("Error al actualizar el perfil");
        });
    } else {
      console.error("Token no encontrado");
    }
  };

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '400px', // Cambia el tamaño del modal aquí
      padding: '20px',
      borderRadius: '8px'
    }
  };

  return (
    <div className="profile-card-content">
      <Text fontWeight="600" fontSize="18px" marginBottom="14px">
        Profile Information
      </Text>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Full Name:
        </Text>
        <Text variation="tertiary">{`${userInfo.nombre} ${userInfo.apellido}`}</Text>
      </Flex>
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Email:
        </Text>
        <Text variation="tertiary">{userInfo.email}</Text>
      </Flex>
      {userInfo.tipoUsuario === "profesional" && (
        <Flex>
          <Text variation="tertiary" fontWeight="600">
            Speciality:
          </Text>
          <Text variation="tertiary">{userInfo.especialidad}</Text>
        </Flex>
      )}
      <Flex>
        <Text variation="tertiary" fontWeight="600">
          Location:
        </Text>
        <Text variation="tertiary">Chile</Text>
      </Flex>
      <div className="profile-card-edit">
        <Button marginLeft="auto" onClick={() => setEditModalOpen(true)}>
          Edit
        </Button>
      </div>

      <Modal
        isOpen={isEditModalOpen}
        onRequestClose={() => setEditModalOpen(false)}
        style={customStyles}
        contentLabel="Edit Profile"
      >
        <form onSubmit={handleEditSubmit} className="edit-form">

          {userInfo.tipoUsuario === "profesional" && (
          <SelectField
          label= {userInfo.especialidad}
          name="especialidad"
          value={editForm.especialidad}
          onChange={handleInputChange}
          isRequired
        
        >
          <option value="">Select an option</option>
          <option value="Cardiología">Cardiología</option>
          <option value="Cirugía">Cirugía</option>
          <option value="Dermatología">Dermatología</option>
          <option value="Infectología">Infectología</option>
          <option value="Medicina Interna">Medicina Interna</option>
        </SelectField>   
            
          )}
          <TextField
            label="Password"
            name="password"
            type="password"
            value={editForm.password}
            onChange={handleInputChange}
            required
          />
          <Button type="submit">Save</Button>
        </form>
      </Modal>

      <ToastContainer />
    </div>
  );
};

export default ProfileInformation;
