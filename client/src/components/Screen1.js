import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import { SketchPicker } from "react-color";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 1 });
  }, []);
  return (
    <div className="screen">
      <h1>Choose from our collections</h1>
    </div>
  );
};
