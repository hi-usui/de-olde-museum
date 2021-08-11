import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

export default (props) => {
  const { pickerref, ...rest } = props;
  const user = useSelector((state) => state.colors.user);
  const previewRef = useRef(null);

  useEffect(() => {
    if (user.coordinates) {
      const pickerCanvas = pickerref.current;
      const pickerCtx = pickerCanvas.getContext("2d");
      const imageData = pickerCtx.getImageData(
        user.coordinates.x - 50,
        user.coordinates.y - 50,
        100,
        100
      );

      const previewCanvas = previewRef.current;
      const previewCtx = previewCanvas.getContext("2d");
      previewCtx.putImageData(imageData, 0, 0);
      previewCtx.fillStyle = "#0000004A";
      previewCtx.fillRect(0, 0, 48, 48);
      previewCtx.fillRect(52, 0, 48, 48);
      previewCtx.fillRect(0, 52, 48, 48);
      previewCtx.fillRect(52, 52, 48, 48);
    }
  }, [user]);

  return <canvas className="preview" ref={previewRef} {...rest} />;
};
