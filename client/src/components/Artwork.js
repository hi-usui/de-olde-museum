import { ART_PREVIEW } from "actions/_index";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

// TO-DO: (Wishlist) If an artpiece is in focus and user clicks outside, unfocus

export default (props) => {
  const { artist, src, title, ...rest } = props;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [click, setClick] = useState(false);

  const accept = async () => {
    const img = new Image();
    img.src = URL.createObjectURL(await (await fetch(src)).blob());
    await img.decode();
    dispatch({
      type: ART_PREVIEW,
      payload: {
        artist,
        src,
        title,
        width: img.width,
        height: img.height,
        femmeGarment: rest.femmeGarment,
        femmeShoes: rest.femmeShoes,
        neutralGarment: rest.neutralGarment,
        neutralShoes: rest.neutralShoes,
      },
    });
    navigate("/workflow/screen2");
  };
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setClick(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }

  return (
    <div
      className="artbox"
      onClick={() => setClick(!click)}
      style={{
        backgroundImage: `url("${src}")`,
      }}
    >
      {click ? (
        <div className="prompt-container" ref={wrapperRef}>
          <h1>Choose</h1>
          <h2>"{title}"?</h2>
          <div className="prompt-options">
            <button id="unselect" onClick={() => setClick(!click)}>
              <svg viewBox="0 0 50 50">
                <line
                  x1="15"
                  x2="35"
                  y1="15"
                  y2="35"
                  stroke="#314243"
                  strokeWidth="1.5px"
                  vectorEffect="non-scaling-stroke"
                />
                <line
                  x1="35"
                  x2="15"
                  y1="15"
                  y2="35"
                  stroke="#314243"
                  strokeWidth="1.5px"
                  vectorEffect="non-scaling-stroke"
                />
              </svg>
            </button>
            <button id="select" onClick={accept}>
              <svg viewBox="0 0 50 50">
                <line
                  x1="12.5"
                  x2="20"
                  y1="26.25"
                  y2="33.75"
                  stroke="white"
                  strokeWidth="1.5px"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
                <line
                  x1="37.5"
                  x2="20"
                  y1="16.25"
                  y2="33.75"
                  stroke="white"
                  strokeWidth="1.5px"
                  vectorEffect="non-scaling-stroke"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};
