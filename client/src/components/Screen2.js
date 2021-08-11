import { PAGE_SET } from "actions/_index";
import ColorPicker from "components/ColorPicker";
import ColorPreview from "components/ColorPreview";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// http://jsfiddle.net/thirtydot/9SEMf/869/
// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.colors.user);
  const preview = useSelector((state) => state.art.preview);
  const pickerRef = useRef();

  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 2 });
  }, []);

  const renderPicker = () => {
    if (!preview.src) {
      return (
        <div className="screen">
          <h1>Please return to step 1 and select a painting</h1>
        </div>
      );
    } else {
      return (
        <div className="screen">
          <h1>Tap inside painting to select color</h1>
          <div className="picker-container">
            <ColorPicker
              canvasRef={pickerRef}
              width={preview.width}
              height={preview.height}
            />
            <div className="bar" style={{ backgroundColor: user.color }}></div>
            {/* <div className="ColorPreview">
              <div className="ColorPreview__color">
                <div
                  className="bar"
                  style={{ backgroundColor: user.color }}
                ></div>
              </div>
              <ColorPreview pickerref={pickerRef} />
            </div> */}
          </div>
          <h2 className="subtitle">
            We will build your outfit's palette around the color you select.
          </h2>
        </div>
      );
    }
  };

  return renderPicker();
};
