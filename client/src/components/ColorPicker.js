import { USER_COLOR_SET } from "actions/_index";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = (event.clientX - rect.left) * (canvas.width / rect.width);
  const y = (event.clientY - rect.top) * (canvas.height / rect.height);
  return { x, y };
};

// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const componentToHex = (c) => {
  const hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
};
const rgbToHex = (r, g, b) => {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
};

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default (props) => {
  const { width, height, canvasRef, ...rest } = props;
  const src = useSelector((state) => state.art.preview.src);
  const dispatch = useDispatch();
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const base_image = new Image();
    base_image.src = src;
    (async () => {
      await base_image.decode();
      ctx.drawImage(base_image, 0, 0);
      const { data } = ctx.getImageData(
        canvas.width / 2,
        canvas.height / 2,
        1,
        1
      );
      dispatch({
        type: USER_COLOR_SET,
        payload: {
          color: rgbToHex(data[0], data[1], data[2]),
          coordinates: { x: canvas.width / 2, y: canvas.height / 2 },
        },
      });
    })();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    (async () => {
      const base_image = new Image();
      base_image.src = src;
      await base_image.decode();
      ctx.drawImage(base_image, 0, 0);
      canvas.addEventListener("click", (e) => {
        const { x, y } = getCursorPosition(canvas, e);
        const { data } = ctx.getImageData(x, y, 1, 1);
        dispatch({
          type: USER_COLOR_SET,
          payload: {
            color: rgbToHex(data[0], data[1], data[2]),
            coordinates: { x, y },
          },
        });
      });
    })();
    return () => {};
  }, [src]);

  return (
    <canvas
      className="picker-canvas"
      ref={canvasRef}
      width={width}
      height={height}
      {...rest}
    />
  );
};
