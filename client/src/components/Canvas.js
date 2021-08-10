import { USER_COLOR_SET } from "actions/_index";
import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";

const getCursorPosition = (canvas, event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
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

// https://stackoverflow.com/questions/35613799/change-image-object-dimensions-width-and-height
const scalePreserveAspectRatio = ({ imgW, imgH, maxW, maxH }) => {
  return Math.min(maxW / imgW, maxH / imgH);
};

// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default (props) => {
  const { dispatch, height, width, ...rest } = props;
  const src = useSelector((state) => {
    if (state.art.preview) return state.art.preview.src;
  });
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const sizer = scalePreserveAspectRatio({
      imgW: width,
      imgH: height,
      maxW: canvas.width,
      maxH: canvas.height,
    });

    const base_image = new Image();
    base_image.src = src;
    console.log(base_image);
    base_image.onload = () => {
      context.drawImage(
        base_image,
        0,
        0,
        width,
        height,
        0,
        0,
        width * sizer,
        height * sizer
      );
    };

    canvas.addEventListener("click", (e) => {
      const { x, y } = getCursorPosition(canvas, e);
      const { data } = context.getImageData(x, y, 1, 1);
      dispatch({
        type: USER_COLOR_SET,
        payload: rgbToHex(data[0], data[1], data[2]),
      });
    });
    return () => {};
  }, [src]);

  return <canvas ref={canvasRef} {...rest} />;
};
