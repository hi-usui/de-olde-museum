import Artwork from "components/Artwork";
import { artists } from "config";
import _ from "lodash";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";

const renderArtworks = (artist) => {
  const jsx = [];
  const req = require.context("assets/artworks", true, /^\.\/.*\.jpg$/);
  const { artworks } = _.filter(artists, { artist })[0];
  for (let artwork of artworks) {
    const path = req(`./${artwork.filepath}`).default;
    jsx.push(
      <Artwork
        key={path}
        src={path}
        artist={artist}
        title={artwork.title}
        femmeGarment={artwork.femmeGarment}
        femmeShoes={artwork.femmeShoes}
        neutralGarment={artwork.neutralGarment}
        neutralShoes={artwork.neutralShoes}
      />
    );
  }
  return jsx;
};

export default () => {
  const artistPos = useSelector((state) => state.art.scrollLeft);
  useEffect(() => {
    const slider = document.querySelector(".gallery");
    slider.scrollLeft = artistPos * 3;
  }, [artistPos]);

  return (
    <div className="gallery" scrollleft={artistPos}>
      <div className="page">
        <div className="artworks">{renderArtworks("Monet")}</div>
      </div>
      <div className="page">
        <div className="artworks">{renderArtworks("O’Keeffe")}</div>
      </div>
      <div className="page">
        <div className="artworks">{renderArtworks("Picasso")}</div>
      </div>
      <div className="page">
        a<div className="artworks">{renderArtworks("Van Gogh")}</div>
      </div>
      <div className="page">
        <div className="artworks">{renderArtworks("Warhol")}</div>
      </div>
    </div>
  );
};
