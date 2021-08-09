import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import QRCode from "react-qr-code";
import { useDispatch } from "react-redux";

// TO-DO Make the QR Code show up only after clicking "Finish"

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 3 });
  }, []);
  return (
    <div className="screen">
      <h1>Your suggested outfits</h1>
    </div>
  );
};
