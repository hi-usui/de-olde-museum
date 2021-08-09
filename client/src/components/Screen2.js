import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 2 });
  }, []);

  return (
    <div className="screen">
      <h1>Press inside painting to select color</h1>
    </div>
  );
};
