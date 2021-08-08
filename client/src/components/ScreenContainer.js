import Screen1 from "components/Screen1";
import Screen2 from "components/Screen2";
import Screen3 from "components/Screen3";
import Screen4 from "components/Screen4";
import React from "react";
import { Route, Routes } from "react-router-dom";

export default () => {
  return (
    <div className="ScreenContainer">
      <Routes>
        <Route path="/screen1" element={<Screen1 />} />
        <Route path="/screen2" element={<Screen2 />} />
        <Route path="/screen3" element={<Screen3 />} />
        <Route path="/screen4" element={<Screen4 />} />
      </Routes>
    </div>
  );
};
