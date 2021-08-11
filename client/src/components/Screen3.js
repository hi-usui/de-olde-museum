import { PAGE_SET } from "actions/_index";
import { clothes } from "config";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// https://css-tricks.com/converting-color-spaces-in-javascript/
function hexToHSL(H) {
  // Convert hex to RGB first
  let r = 0,
    g = 0,
    b = 0;
  if (H.length == 4) {
    r = "0x" + H[1] + H[1];
    g = "0x" + H[2] + H[2];
    b = "0x" + H[3] + H[3];
  } else if (H.length == 7) {
    r = "0x" + H[1] + H[2];
    g = "0x" + H[3] + H[4];
    b = "0x" + H[5] + H[6];
  }
  // Then to HSL
  r /= 255;
  g /= 255;
  b /= 255;
  let cmin = Math.min(r, g, b),
    cmax = Math.max(r, g, b),
    delta = cmax - cmin,
    h = 0,
    s = 0,
    l = 0;

  if (delta == 0) h = 0;
  else if (cmax == r) h = ((g - b) / delta) % 6;
  else if (cmax == g) h = (b - r) / delta + 2;
  else h = (r - g) / delta + 4;

  h = Math.round(h * 60);

  if (h < 0) h += 360;

  l = (cmax + cmin) / 2;
  s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return [h, s, l];
}

export default () => {
  const preview = useSelector((state) => state.art.preview);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 3 });
  }, []);

  const painting = useSelector((state) => state.art.preview);
  const { neutralGarment, neutralShoes, femmeGarment, femmeShoes } = painting;
  const userColor = hextoHSL(useSelector((state) => state.colors.user.color));

  const clothesReq = require.context("assets/clothes", true, /^\.\/.*\.png$/);

  const {
    neutral: {
      static: {
        shoes: neutralStaticShoes,
        garments: {
          jackets: neutralStaticGarmentsJackets,
          pants: neutralStaticGarmentsPants,
        },
      },
      dynamic: neutralDynamicItems,
    },
    femme: {
      static: {
        shoes: femmeStaticShoes,
        garments: {
          dresses: femmeStaticGarmentsDresses,
          skirts: femmeStaticGarmentsSkirts,
        },
      },
      dynamic: femmeDynamicItems,
    },
  } = clothes;

  const renderClothes = () => {
    if (!preview.src) {
      return (
        <div className="screen">
          <h1>Please return to step 1 and select a painting</h1>
        </div>
      );
    } else {
      let fGarmentUrl;
      const fShoesUrl = clothesReq(
        `./${_.find(femmeStaticShoes, ["color", femmeShoes]).filepath}`
      ).default;
      const foundFemmeGarmentDress = _.find(femmeStaticGarmentsDresses, [
        "color",
        femmeGarment,
      ]);
      const foundFemmeGarmentSkirt = _.find(femmeStaticGarmentsSkirts, [
        "color",
        femmeGarment,
      ]);
      if (foundFemmeGarmentDress) {
        fGarmentUrl = clothesReq(
          `./${foundFemmeGarmentDress.filepath}`
        ).default;
      } else if (foundFemmeGarmentSkirt) {
        fGarmentUrl = clothesReq(
          `./${foundFemmeGarmentSkirt.filepath}`
        ).default;
      }

      let nGarmentUrl;
      const nShoesUrl = clothesReq(
        `./${_.find(neutralStaticShoes, ["color", neutralShoes]).filepath}`
      ).default;
      const foundNeutralGarmentPants = _.find(neutralStaticGarmentsPants, [
        "color",
        neutralGarment,
      ]);
      const foundNeutralGarmentJacket = _.find(neutralStaticGarmentsJackets, [
        "color",
        neutralGarment,
      ]);
      if (foundNeutralGarmentPants) {
        nGarmentUrl = clothesReq(
          `./${foundNeutralGarmentPants.filepath}`
        ).default;
      } else if (foundNeutralGarmentJacket) {
        nGarmentUrl = clothesReq(
          `./${foundNeutralGarmentJacket.filepath}`
        ).default;
      }

      const neutralDynamicUrls = {};
      for (let key in neutralDynamicItems) {
        neutralDynamicUrls[key] = clothesReq(
          `./${neutralDynamicItems[key].filepath}`
        ).default;
      }
      const femmeDynamicUrls = {};
      for (let key in femmeDynamicItems) {
        femmeDynamicUrls[key] = clothesReq(
          `./${femmeDynamicItems[key].filepath}`
        ).default;
      }

      const renderNeutralGarment = () => {
        if (foundNeutralGarmentPants) {
          return (
            <div className="pantsLayout">
              <div className="pantsRow1 tentall">
                <img src={neutralDynamicUrls.cap} className="cap" />
              </div>
              <div className="pantsRow2 fifteentall">
                <img
                  src={neutralDynamicUrls.sweatshirt}
                  className="sweatshirt"
                />
                <img src={neutralDynamicUrls.tshirt} className="tshirt" />
              </div>
              <div className="pantsRow3 tentall">
                <img src={nGarmentUrl} className="pants" />
                <img src={nShoesUrl} className="nShoes" />
              </div>
            </div>
          );
        } else if (foundNeutralGarmentJacket) {
          return (
            <div className="jacketLayout">
              <div className="jacketRow1 tentall">
                <img src={neutralDynamicUrls.cap} className="cap" />
              </div>
              <div className="jacketRow2 fifteentall">
                <img src={nGarmentUrl} className="jacket" />
                <img src={neutralDynamicUrls.tshirt} className="tshirt" />
              </div>
              <div className="jacketRow3 tentall">
                <img src={neutralDynamicUrls.shorts} className="shorts" />
                <img src={nShoesUrl} className="nShoes" />
              </div>
            </div>
          );
        }
      };

      const renderFemmeGarment = () => {
        if (foundFemmeGarmentDress) {
          return (
            <div className="dressLayout">
              <div className="dressRow1 tentall">
                <img src={femmeDynamicUrls.sunhat} className="sunhat" />
                <img src={femmeDynamicUrls.ribbon} className="ribbon" />
              </div>
              <div className="dressRow2 twentyfivetall">
                <div className="dressRow2Col1">
                  <img src={fGarmentUrl} className="dress" />
                </div>
                <div className="dressRow2Col2">
                  <img src={femmeDynamicUrls.purse} className="purse" />
                  <img src={fShoesUrl} className="fShoes" />
                </div>
              </div>
            </div>
          );
        } else if (foundFemmeGarmentSkirt) {
          return (
            <div className="skirtLayout">
              <div className="skirtRow1 tentall">
                <img src={neutralDynamicUrls.sunhat} className="sunhat" />
                <img src={neutralDynamicUrls.ribbon} className="ribbon" />
              </div>
              <div className="skirtRow2 fifteentall">
                <img src={neutralDynamicUrls.tanktop} className="tanktop" />
                <img src={neutralDynamicUrls.purse} className="purse" />
              </div>
              <div className="skirtRow3 tentall">
                <img src={fGarmentUrl} className="skirt" />
                <img src={fShoesUrl} className="fShoes" />
              </div>
            </div>
          );
        }
      };

      return (
        <div className="screen">
          <h1>Your suggested outfits (DEBUG: userColor {userColor})</h1>
          <div className="suggestedBody">
            <div className="neutral">{renderNeutralGarment()}</div>
            <div className="femme">{renderFemmeGarment()}</div>
          </div>
          <h2 className="subtitle">
            Continue to the next step for directions to these items!
          </h2>
        </div>
      );
    }
  };

  return renderClothes();
};
