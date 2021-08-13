import React from "react";
import { useNavigate } from "react-router-dom";

export default (props) => {
  const navigate = useNavigate();
  if (props.active) {
    return (
      <div
        className="SidebarTab active"
        onClick={() => navigate(`/workflow/screen${props.title}`)}
        key={props.title}
      >
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  } else {
    return (
      <div className="SidebarTab" key={props.title}>
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  }
};
