import React from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const page = useSelector((state) => state.page);
  if (page == props.title) {
    return (
      <div className="SidebarTab active">
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  } else {
    return (
      <div className="SidebarTab">
        <h1>{props.title}</h1>
        <h2>{props.subtitle}</h2>
      </div>
    );
  }
};
