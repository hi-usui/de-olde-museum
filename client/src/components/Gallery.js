import Artwork from "components/Artwork";
import React from "react";

export default () => {
  return (
    <div className="Gallery" style={{ backgroundColor: "red" }}>
      <div className="Gallery__artworks">
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
        <div className="Gallery__artworks__artbox">
          <Artwork />
        </div>
      </div>
    </div>
  );
};
