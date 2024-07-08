import React, { useState, useEffect } from "react";
import "./SideBar.css";
import getAppNavs from "../../config";
import SideBarNav from "./SidebarNav";
import SidebarNavToggle from "./SidebarNavToggle";

const SideBar = () => {
  const [expand, setExpand] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);

  useEffect(() => {
    const type = localStorage.getItem('userType');
    setUserType(type);
  }, []);

  if (!userType) {
    return null; // O puedes retornar un indicador de carga mientras se determina el userType
  }

  const navs = getAppNavs(userType);

  return (
    <>
      <div className="btn-sidebar-nav">
        <SidebarNavToggle expand={expand} onChange={() => setExpand(!expand)} />
      </div>
      <div className={"sidebar " + (expand ? "visible" : "")}>
        <SideBarNav navs={navs} />
      </div>
    </>
  );
};

export default SideBar;
