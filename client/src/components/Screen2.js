import { PAGE_SET } from "actions/_index";
import Canvas from "components/Canvas";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// http://jsfiddle.net/thirtydot/9SEMf/869/
// https://ourcodeworld.com/articles/read/185/how-to-get-the-pixel-color-from-a-canvas-on-click-or-mouse-event-with-javascript
// https://medium.com/@pdx.lucasm/canvas-with-react-js-32e133c05258
export default () => {
  const dispatch = useDispatch();
  const userColor = useSelector((state) => state.colors.user);

  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 2 });
  }, []);

  return (
    <div className="screen">
      <h1>Tap inside painting to select color</h1>
      <div className="ColorPicker">
        <div className="ColorPicker__artContainer">
          <Canvas
            className="ColorPicker__art"
            height={600}
            width={1200}
            dispatch={dispatch}
          />
        </div>
        <div className="ColorPicker__color">
          <div style={{ backgroundColor: userColor }}>
            <br />
          </div>
          <div>{userColor}</div>
        </div>
      </div>
      <h2>The color you select will determine your outfit's palette</h2>
    </div>
  );
};
