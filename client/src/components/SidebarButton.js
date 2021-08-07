import React from "react";

export default (props) => {
  return (
    <div className="SidebarButton">
      <div className="SidebarButton__title">{props.title}</div>
      <div className="SidebarButton__subtitle">{props.subtitle}</div>
    </div>
  );
};
