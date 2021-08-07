import ScreenContainer from "components/ScreenContainer";
import Sidebar from "components/Sidebar";
import React from "react";

export default () => {
  return (
    <div className="Workflow">
      <div className="Workflow__Box">
        <Sidebar />
      </div>
      <div className="Workflow__Box">
        <ScreenContainer />
      </div>
    </div>
  );
};
