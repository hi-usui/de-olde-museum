import React from "react";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  return (
    <div className="Landing">
      Don't worry about the backgroundColor, we will change it later
      <button onClick={() => navigate("/workflow/screen1")}>SCREEN 1</button>
      <button onClick={() => navigate("/workflow/screen2")}>SCREEN 2</button>
      <button onClick={() => navigate("/workflow/screen3")}>SCREEN 3</button>
    </div>
  );
};