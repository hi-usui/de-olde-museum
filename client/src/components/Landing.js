import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 0 });
  }, []);
  return (
    <div className="Landing">
      <div id="logo">
        <p>
          <strong>De Olde \</strong>
        </p>
        <p>
          <strong>\ Legion of Dishonor</strong>
        </p>
        <p>museum store</p>
      </div>
      <h3>Find an outfit inspired by your favorite artwork!</h3>
    </div>
  );
};
