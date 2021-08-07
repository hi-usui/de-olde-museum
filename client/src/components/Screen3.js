import React from "react";
import QRCode from "react-qr-code";

// TO-DO Make the QR Code show up only after clicking "Finish"

export default () => {
  return (
    <div className="Screen__3">
      SCREEN 3
      <QRCode value={`${new URL("/", window.location.href)}`} size={300} />
    </div>
  );
};
