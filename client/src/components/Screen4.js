import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 4 });
  }, []);
  const outfit = useSelector((state) => state.outfit);
  const preview = useSelector((state) => state.art.preview);
  const { femme, neutral } = outfit;
  const encoded = Buffer.from(
    JSON.stringify({
      details: {
        femme: outfit.femme.clothes,
        neutral: outfit.neutral.clothes,
      },
      art: preview.src,
    })
  ).toString("base64");
  console.log(
    `DEBUG: ${window.location.protocol}//${window.location.hostname}:${window.location.port}/phone?outfit=${encoded}`
  );

  const renderFemmeClothes = () =>
    femme.clothes.map((cloth, index) => {
      if (index == 0) {
        return (
          <div key={cloth.src} className="cloth ssunhat">
            <img src={cloth.src} style={cloth.style} />
            <div>Aisle {cloth.aisle}</div>
          </div>
        );
      } else if (index == 1) {
        return (
          <div key={cloth.src} className="cloth sribbon">
            <img src={cloth.src} style={cloth.style} />
          </div>
        );
      } else if (index == 2) {
        return (
          <div key={cloth.src} className="cloth sgarment">
            <img src={cloth.src} style={cloth.style} />
            <div>Aisle {cloth.aisle}</div>
          </div>
        );
      } else {
        return (
          <div key={cloth.src} className="cloth">
            <img src={cloth.src} style={cloth.style} />
            <div>Aisle {cloth.aisle}</div>
          </div>
        );
      }
    });

  const renderNeutralClothes = () =>
    neutral.clothes.map((cloth) => (
      <div key={cloth.src} className="cloth">
        <img src={cloth.src} style={cloth.style} />
        <div>Aisle {cloth.aisle}</div>
      </div>
    ));

  const selectionRender = () => {
    if (neutral.clothes && neutral.palette && femme.clothes && femme.palette) {
      const phoneUrl = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/phone?outfit=${encoded}`;
      return (
        <div className="dirBody">
          <div className="dbCol1">
            <a href={phoneUrl}>
              <QRCode size={300} fgColor="#314243" value={phoneUrl} />
            </a>
            <h2>Open your phone camera and point it at the QR code!</h2>
          </div>
          <div className="dbCol2">{renderNeutralClothes()}</div>
          <div className="dbCol3">{renderFemmeClothes()}</div>
        </div>
      );
    } else {
      return <Navigate to="/workflow/screen1" />;
    }
  };
  return (
    <div className="screen">
      <h1>Scan to save</h1>
      {selectionRender()}
    </div>
  );
};
