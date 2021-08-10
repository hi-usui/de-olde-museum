import { ART_PREVIEW } from "actions/_index";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// TO-DO: (Wishlist) If an artpiece is in focus and user clicks outside, unfocus

export default (props) => {
  const { artist, src, title } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const accept = () => {
    dispatch({
      type: ART_PREVIEW,
      payload: {
        artist,
        src,
        title,
      },
    });
    navigate("/workflow/screen2");
  };

  return (
    <div
      className="artbox"
      onClick={() => setClick(!click)}
      style={{
        backgroundImage: `url("${src}")`,
      }}
    >
      {click ? (
        <div className="prompt-container">
          <h1>Choose</h1>
          <h2>"{title}"?</h2>
          <div className="prompt-options">
            <button id="unselect" onClick={accept}>
              asdfasdf
            </button>
            <button id="select" onClick={accept}>
              asdfasdf
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
