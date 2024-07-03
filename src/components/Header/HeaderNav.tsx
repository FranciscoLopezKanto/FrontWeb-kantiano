import React, { useEffect, useState } from "react";
import { Menu, MenuItem, MenuButton, Link } from "@aws-amplify/ui-react";
import { useNavigate } from "react-router-dom";
import { AiFillGithub } from "react-icons/ai";
import { baseConfig } from "../../config";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const HeaderNav = () => {
  const navigate = useNavigate();
  const [profileImageUrl, setProfileImageUrl] = useState<string>("");

  useEffect(() => {
    const storedUserType = localStorage.getItem("userType");
    const safeUserType = storedUserType || ""; // Default to empty string if null

    if (safeUserType === "profesional") {
      setProfileImageUrl("https://i.ibb.co/QNNmj2t/imagen-2024-05-21-163912163.png");
    } else if (safeUserType === "secretaria") {
      setProfileImageUrl("https://i.ibb.co/GdY564C/imagen-2024-05-21-163814319.png");
    }
  }, []);

  const handleLogout = () => {
    toast.success("Sesión cerrada");

    setTimeout(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("userType");
      navigate("/login");
    }, 1500); // 1.5 segundos
  };

  return (
    <>
      <ToastContainer />
      {baseConfig.projectLink ? (
        <div className="github-link">
          <Link
            href={baseConfig.projectLink}
            isExternal={true}
            ariaLabel="github"
          >
            <AiFillGithub />
          </Link>
        </div>
      ) : (
        <></>
      )}

      <Menu
        menuAlign="end"
        trigger={
          <MenuButton variation="menu">
            <div className="header-avatar">
              <img alt="avatar" src={profileImageUrl}></img>
            </div>
          </MenuButton>
        }
      >
        <MenuItem onClick={() => navigate("/profile")}>Profile</MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>Settings</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </>
  );
};

export default HeaderNav;
