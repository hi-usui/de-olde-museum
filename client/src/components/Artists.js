import React from "react";

export default () => {
  // const gra = function (min, max) {
  //   return Math.random() * (max - min) + min;
  // };
  // const gri = function (min, max) {
  //   return Math.floor(Math.random() * (max - min + 1)) + min;
  // };
  // const init = function () {
  //   let items = document.querySelectorAll("ul li");
  //   for (let i = 0; i < items.length; i++) {
  //     items[i].style.minWidth = gra(30, 60) + "vw";
  //     items[i].style.background = randomColor({ luminosity: "light" });
  //   }
  //   // cssScrollSnapPolyfill();
  // };
  // init();
  return (
    <nav>
      <ul>
        <li>Monet</li>
        <li>O'Keeffe</li>
        <li>Picasso</li>
        <li>Warhol</li>
        <li>Van Gogh</li>
      </ul>
    </nav>
  );
};
