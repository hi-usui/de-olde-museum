import { PAGE_SET } from "actions/_index";
import Canvas from "components/common/Canvas";
import React, { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

// http://jsfiddle.net/thirtydot/9SEMf/869/
// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default () => {
  const canvasRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 2 });
  }, []);

  const draw = (ctx, frameCount) => {
    console.log(ctx);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.arc(50, 100, 20 * Math.sin(frameCount * 0.05) ** 2, 0, 2 * Math.PI);
    ctx.fill();
  };

  // canvas.addEventListener(
  //   "click",
  //   function (event) {
  //     // Get the coordinates of the click
  //     var eventLocation = getEventLocation(this, event);
  //     // Get the data of the pixel according to the location generate by the getEventLocation function
  //     var context = this.getContext("2d");
  //     var pixelData = context.getImageData(
  //       eventLocation.x,
  //       eventLocation.y,
  //       1,
  //       1
  //     ).data;

  //     // If transparency on the pixel , array = [0,0,0,0]
  //     if (
  //       pixelData[0] == 0 &&
  //       pixelData[1] == 0 &&
  //       pixelData[2] == 0 &&
  //       pixelData[3] == 0
  //     ) {
  //       // Do something if the pixel is transparent
  //     }

  //     // Convert it to HEX if you want using the rgbToHex method.
  //     // var hex = "#" + ("000000" + rgbToHex(pixelData[0], pixelData[1], pixelData[2])).slice(-6);
  //   },
  //   false
  // );

  return (
    <div className="screen">
      <h1>Press inside painting to select color</h1>
      <Canvas width={500} height={500} draw={draw} />
    </div>
  );
};
