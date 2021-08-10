import Artists from "components/Artists";
import Gallery from "components/Gallery";
import React from "react";

export default () => {
  return (
    <div style={{ color: "white" }}>
      <Artists />
      <div id="focus-line"></div>
      <Gallery />
    </div>
  );
};
