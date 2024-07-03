import React, { useEffect, useState } from "react";
import { Flex, Text } from "@aws-amplify/ui-react";
import axios from "axios";

interface ProfileHeaderProps {
  nombre?: string;
  apellido?: string;
  email?: string;
  tipoUsuario?: string;
  imageSrc?: string;
}

const ProfileHeader = (props: ProfileHeaderProps) => {
  const [userInfo, setUserInfo] = useState<{ nombre: string,apellido: string; email: string ;tipoUsuario: string}>({
    nombre: "",
    apellido: "",
    email: "",
    tipoUsuario: "",
  });

  useEffect(() => {
    const userType = localStorage.getItem("userType");
    const userId = getUserIdFromToken();

    if (userType && userId) {
      const backendUrl = getBackendUrl(userType, userId);
      axios
        .get(backendUrl)
        .then((response) => {
          console.log("Información del usuario:", response.data);
          setUserInfo(response.data); })
        .catch((error) => {
          console.error("Error al obtener la información del usuario:", error);
        });
    }
  }, []);

  const getUserIdFromToken = (): string | null => {
    const token = localStorage.getItem("token");
    if (token) {
      const tokenPayload = JSON.parse(atob(token.split(".")[1]));
      return tokenPayload.id;
    }
    return null;
  };

  const getBackendUrl = (userType: string, userId: string): string => {
    return userType === "profesional"
      ? `${process.env.REACT_APP_URL}api/v1/profesionales/${userId}`
      : `${process.env.REACT_APP_URL}api/v1/secretarias/${userId}`;
  };

  return (
    <>
      <Flex
        direction={{ base: "column", large: "row" }}
        alignItems="flex-start"
      >
        <div className="profile-header-image">
          <img
            alt="avatar"
            src={
              userInfo.tipoUsuario === "profesional"
                ? "https://i.ibb.co/QNNmj2t/imagen-2024-05-21-163912163.png"
                : "https://i.ibb.co/GdY564C/imagen-2024-05-21-163814319.png"
            }
          ></img>
        </div>
        <div className="profile-header-text">
          <Text variation="primary" fontWeight={600} fontSize="18px">
            {userInfo.nombre || props.nombre} {userInfo.apellido}
          </Text>
          <Text variation="tertiary">{userInfo.email || props.email}</Text>
        </div>
      </Flex>
    </>
  );
};

export default ProfileHeader;