import React from "react";
import { AiOutlineHome, AiOutlineUserSwitch, AiOutlineMessage, AiOutlineBell } from "react-icons/ai";
import { BsBriefcase } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./BottomBar.scss";

export default function BottomBar() {
  let navigate = useNavigate();

  const goToRoute = (route) => {
    navigate(route);
  };

  return (
    <div className="bottombar-main">
      <AiOutlineHome size={30} className="react-icon" onClick={() => goToRoute("/home")} />
      <AiOutlineUserSwitch size={30} className="react-icon" onClick={() => goToRoute("/connections")} />
      <BsBriefcase size={30} className="react-icon" onClick={() => goToRoute("/companies")} />
      <AiOutlineMessage size={30} className="react-icon" onClick={() => goToRoute("/message")} />
      <AiOutlineBell size={30} className="react-icon" />
    </div>
  );
}
