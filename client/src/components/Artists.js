import { ART_SCROLL_LEFT } from "actions/_index";
import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

// https://dev.to/fredericrous/minimal-carousel-with-scroll-snap-mobile-mouse-friendly-1dl

// TODO:
// Move to artist page on click

export default () => {
  const dispatch = useDispatch();
  const artistPos = useSelector((state) => state.art.scrollLeft);
  const ref = useRef(null);

  const handleClick = (e) => {
    const slider = ref.current;
    slider.scrollLeft =
      e.currentTarget.offsetLeft - e.currentTarget.offsetWidth;
  };

  useEffect(() => {
    const slider = ref.current;
    let isDown = false;
    let startX;
    let scrollLeft;
    if (artistPos) slider.scrollLeft = artistPos;
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      slider.classList.add("active");
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("mouseleave", (_) => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mouseup", (_) => {
      isDown = false;
      slider.classList.remove("active");
    });
    slider.addEventListener("mousemove", (e) => {
      e.preventDefault();
      if (!isDown) return;
      const x = e.pageX - slider.offsetLeft;
      const SCROLL_SPEED = 2;
      const walk = (x - startX) * SCROLL_SPEED;
      slider.scrollLeft = scrollLeft - walk;
    });
    slider.addEventListener("scroll", (e) => {
      dispatch({ type: ART_SCROLL_LEFT, payload: e.target.scrollLeft });
    });
  }, []);

  return (
    <div className="scroll-master">
      <div className="scroll-overlay"></div>
      <div className="scroll-container" ref={ref}>
        <div></div>
        {["Monet", "O'Keeffe", "Picasso", "Van Gogh", "Warhol"].map(
          (artist) => (
            <div className="artist" key={artist} onClick={handleClick}>
              {artist}
            </div>
          )
        )}
        <div></div>
      </div>
    </div>
  );
};
