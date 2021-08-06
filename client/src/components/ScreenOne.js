import React from "react";
import { useLocation } from "react-router-dom";
import "sass/ScreenOne.scss";

const useQuery = () => new URLSearchParams(useLocation().search);

export default () => {
  return (
    <div className="container-fluid">
      <div className="row init-landing">
        <div className="col-sm-12"></div>
      </div>
      <div className="row height-width">
        <div className="col-sm-12">
          <h1></h1>
        </div>
      </div>
    </div>
  );
};
