import { PAGE_SET } from "actions/_index";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 0 });
  }, []);
  return (
    <div className="Landing">
      <div id="rightlogo">
        <p>
          <strong>De Olde \</strong>
        </p>
        <p>
          <strong>\ Legion of Dishonor</strong>
        </p>
        <p>museum store</p>
      </div>
      <h3>Find outfits inspired by</h3>
      <h3>your favorite artworks!</h3>
      <button
        onClick={() => {
          navigate("/workflow/screen1");
        }}
      >
        Start
      </button>
      <div className="landingStep">
        <h1>1</h1>
        <h2>Choose</h2>
        <h2>Artwork</h2>
      </div>
      <div className="landingStep">
        <h1>2</h1>
        <h2>Select</h2>
        <h2>Color</h2>
      </div>
      <div className="landingStep">
        <h1>3</h1>
        <h2>View</h2>
        <h2>Steps</h2>
      </div>
      <div className="landingStep">
        <h1>4</h1>
        <h2>Save to</h2>
        <h2>Phone</h2>
      </div>
    </div>
  );
};
