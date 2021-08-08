import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const page = useSelector((state) => state.navigator);

  return (
    <div className="screen">
      <h1>Press inside painting to select color</h1>
    </div>
  );
};
