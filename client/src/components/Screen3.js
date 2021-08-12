import {
  CLOTHES_FEMME_CLOTH_SET,
  CLOTHES_FEMME_PALETTE_SET,
  CLOTHES_NEUTRAL_CLOTH_SET,
  CLOTHES_NEUTRAL_PALETTE_SET,
  PAGE_SET,
} from "actions/_index";
import { clothes } from "config";
import _ from "lodash";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

// https://css-tricks.com/converting-color-spaces-in-javascript/
const formatHSL = (hsl) => {
  return "hsl(" + hsl[0] + ", " + hsl[1] + "%, " + hsl[2] + "%)";
};
const hexToHSL = (H) => {
  if (!H) return;
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
};

export default () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: PAGE_SET, payload: 3 });
  }, []);

  const painting = useSelector((state) => state.art.preview);
  const { neutralGarment, neutralShoes, femmeGarment, femmeShoes } = painting;
  const userColor = useSelector((state) => state.colors.user.color);
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
    if (!userColor) {
      return <Navigate to="/workflow/screen1" />;
    } else {
      const userColorHSL = hexToHSL(userColor);
      const userSwatch = [
        Math.round((userColorHSL[0] / 18) * 18),
        Math.round(userColorHSL[1] / 25) * 20 + 10,
        Math.round(userColorHSL[2] / 25) * 20 + 10,
      ];
      const neutralSwatch1 = [
        Math.round(userColorHSL[0] / 18) * 18,
        Math.round(userColorHSL[1] / 25) * 10 + 40,
        60,
      ];
      const neutralSwatch2 = [
        Math.round(userColorHSL[0] / 18) * 18,
        Math.round(userColorHSL[1] / 25) * 20 + 10,
        75,
      ];
      const femmeSwatch1 = [
        Math.round(userColorHSL[0] / 18) * 18,
        Math.round(userColorHSL[1] / 25) * 10 + 40,
        Math.round(userColorHSL[2] / 25) * 20 + 10,
      ];
      const femmeSwatch2 = [
        (Math.round(userColorHSL[0] / 18) - 1) * 18,
        Math.round(userColorHSL[1] / 25) * 15,
        70,
      ];

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

      const neutralPalette = [
        formatHSL(userSwatch),
        formatHSL(neutralSwatch1),
        formatHSL(neutralSwatch2),
        neutralShoes,
        neutralGarment,
      ];

      const femmePalette = _.filter(
        [
          formatHSL(userSwatch),
          foundFemmeGarmentDress ? null : formatHSL(femmeSwatch1),
          formatHSL(femmeSwatch2),
          femmeShoes,
          femmeGarment,
        ],
        (el) => el != null
      );

      const renderNeutralPalette = () => (
        <div className="swatches">
          {neutralPalette.map((swatch) => (
            <div
              key={swatch}
              className="swatch"
              style={{ backgroundColor: swatch }}
            ></div>
          ))}
        </div>
      );

      const renderFemmePalette = () => (
        <div className="swatches">
          {femmePalette.map((swatch) => (
            <div
              key={swatch}
              className="swatch"
              style={{ backgroundColor: swatch }}
            ></div>
          ))}
        </div>
      );
      const femmeClothes = [];
      const neutralClothes = [];

      if (foundNeutralGarmentPants) {
        neutralClothes.push({
          src: neutralDynamicUrls.cap,
          style: {
            filter: `hue-rotate(${neutralSwatch1[0]}deg) saturate(${
              neutralSwatch1[1] * 2.0
            }%) brightness(${1.2})`,
          },
          aisle: 1,
        });
        neutralClothes.push({
          src: nShoesUrl,
          aisle: 2,
        });
        neutralClothes.push({
          src: neutralDynamicUrls.tshirt,
          style: {
            filter: `hue-rotate(${userSwatch[0]}deg) saturate(${
              userSwatch[2] < 90
                ? userSwatch[2] < 60
                  ? userSwatch[1] * 3.0
                  : userSwatch[1] * 1.5
                : userSwatch[1] * 0.5
            }%) brightness(${userSwatch[2] / 60})`,
          },
          aisle: 3,
        });
        neutralClothes.push({
          src: neutralDynamicUrls.sweatshirt,
          style: {
            filter: `hue-rotate(${neutralSwatch2[0]}deg) saturate(${
              neutralSwatch2[1] * 2.0
            }%)`,
          },
          aisle: 4,
        });
        neutralClothes.push({
          src: nGarmentUrl,
          aisle: 5,
        });
      } else if (foundNeutralGarmentJacket) {
        neutralClothes.push({
          src: neutralDynamicUrls.cap,
          style: {
            filter: `hue-rotate(${neutralSwatch1[0]}deg) saturate(${
              neutralSwatch1[1] * 2.0
            }%) brightness(${1.2})`,
          },
          aisle: 1,
        });
        neutralClothes.push({
          src: nGarmentUrl,
          aisle: 4,
        });
        neutralClothes.push({
          src: neutralDynamicUrls.tshirt,
          style: {
            filter: `hue-rotate(${userSwatch[0]}deg) saturate(${
              userSwatch[2] < 90
                ? userSwatch[2] < 60
                  ? userSwatch[1] * 3.0
                  : userSwatch[1] * 1.5
                : userSwatch[1] * 0.5
            }%) brightness(${userSwatch[2] / 60})`,
          },
          aisle: 3,
        });
        neutralClothes.push({
          src: neutralDynamicUrls.shorts,
          style: {
            filter: `hue-rotate(${neutralSwatch2[0]}deg) saturate(${
              neutralSwatch2[1] * 2.0
            }%)`,
          },
          aisle: 5,
        });
        neutralClothes.push({
          src: nShoesUrl,
          aisle: 2,
        });
      }
      if (foundFemmeGarmentDress) {
        femmeClothes.push({
          src: femmeDynamicUrls.sunhat,
          aisle: 1,
        });
        femmeClothes.push({
          src: femmeDynamicUrls.ribbon,
          style: {
            filter: `hue-rotate(${userSwatch[0]}deg) saturate(${
              femmeSwatch1[2] < 90
                ? femmeSwatch1[2] < 60
                  ? femmeSwatch1[1] * 4.0
                  : femmeSwatch1[1] * 2.0
                : femmeSwatch1[1] * 0.5
            }%) brightness(${userSwatch[2] / 65})`,
          },
          aisle: 1,
        });
        femmeClothes.push({
          src: fGarmentUrl,
          aisle: 6,
        });
        femmeClothes.push({
          src: femmeDynamicUrls.purse,
          style: {
            filter: `hue-rotate(${femmeSwatch2[0]}deg) saturate(${
              femmeSwatch2[1] * 2.5
            }%)`,
          },
          aisle: 1,
        });
        femmeClothes.push({
          src: fShoesUrl,
          aisle: 2,
        });
      } else if (foundFemmeGarmentSkirt) {
        femmeClothes.push({
          src: femmeDynamicUrls.sunhat,
          aisle: 1,
        });
        femmeClothes.push({
          src: femmeDynamicUrls.ribbon,
          style: {
            filter: `hue-rotate(${femmeSwatch1[0]}deg) saturate(${
              femmeSwatch1[2] < 90
                ? femmeSwatch1[2] < 60
                  ? femmeSwatch1[1] * 3.0
                  : femmeSwatch1[1] * 2.0
                : femmeSwatch1[1] * 0.5
            }%) brightness(${userSwatch[2] / 65})`,
          },
          aisle: 1,
        });
        femmeClothes.push({
          src: femmeDynamicUrls.tanktop,
          style: {
            filter: `hue-rotate(${userSwatch[0]}deg) saturate(${
              userSwatch[2] < 90
                ? userSwatch[2] < 60
                  ? userSwatch[1] * 3.0
                  : userSwatch[1] * 1.5
                : userSwatch[1] * 0.25
            }%) brightness(${userSwatch[2] / 65})`,
          },
          aisle: 3,
        });
        femmeClothes.push({
          src: femmeDynamicUrls.purse,
          style: {
            filter: `hue-rotate(${femmeSwatch2[0]}deg) saturate(${
              femmeSwatch2[1] * 2.5
            }%)`,
          },
          aisle: 5,
        });
        femmeClothes.push({
          src: fGarmentUrl,
          aisle: 6,
        });
        femmeClothes.push({
          src: fShoesUrl,
          aisle: 2,
        });
      }

      const renderNeutralGarment = () => {
        if (foundNeutralGarmentPants) {
          return (
            <div className="pantsLayout">
              <div className="pantsRow1 tentall">
                <img
                  src={neutralClothes[0].src}
                  className="cap"
                  style={neutralClothes[0].style}
                />
                <img src={neutralClothes[1].src} className="nShoes shoes" />
              </div>
              <div className="pantsRow2 twentyfivetall">
                <div className="pantsRow2Col1">
                  <img
                    src={neutralClothes[2].src}
                    className="tshirt"
                    style={neutralClothes[2].style}
                  />
                  <img
                    src={neutralClothes[3].src}
                    className="sweatshirt"
                    style={neutralClothes[3].style}
                  />
                </div>
                <div className="pantsRow2Col2">
                  <img src={neutralClothes[4].src} className="pants" />
                </div>
              </div>
            </div>
          );
        } else if (foundNeutralGarmentJacket) {
          return (
            <div className="jacketLayout">
              <div className="jacketRow1 tentall">
                <img
                  src={neutralClothes[0].src}
                  className="cap"
                  style={neutralClothes[0].style}
                />
              </div>
              <div className="jacketRow2 fifteentall">
                <img src={neutralClothes[1].src} className="jacket" />
                <img
                  src={neutralClothes[2].src}
                  className="tshirt"
                  style={neutralClothes[2].style}
                />
              </div>
              <div className="jacketRow3 tentall">
                <img
                  src={neutralClothes[3].src}
                  className="shorts"
                  style={neutralClothes[3].style}
                />
                <img src={neutralClothes[4].src} className="nShoes shoes" />
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
                <img src={femmeClothes[0].src} className="sunhat" />
                <img
                  src={femmeClothes[1].src}
                  className="ribbon"
                  style={femmeClothes[1].style}
                />
              </div>
              <div className="dressRow2 twentyfivetall">
                <div className="dressRow2Col1">
                  <img src={femmeClothes[2].src} className="dress" />
                </div>
                <div className="dressRow2Col2">
                  <img
                    src={femmeClothes[3].src}
                    className="purse"
                    style={femmeClothes[3].style}
                  />
                  <img src={femmeClothes[4].src} className="fShoes shoes" />
                </div>
              </div>
            </div>
          );
        } else if (foundFemmeGarmentSkirt) {
          return (
            <div className="skirtLayout">
              <div className="skirtRow1 tentall">
                <img src={femmeClothes[0].src} className="sunhat" />
                <img
                  src={femmeClothes[1].src}
                  className="ribbon"
                  style={femmeClothes[1].style}
                />
              </div>
              <div className="skirtRow2 fifteentall">
                <img
                  src={femmeClothes[2].src}
                  className="tanktop"
                  style={femmeClothes[2].style}
                />
                <img
                  src={femmeClothes[3].src}
                  className="purse"
                  style={femmeClothes[3].style}
                />
              </div>
              <div className="skirtRow3 tentall">
                <img src={femmeClothes[4].src} className="skirt" />
                <img src={femmeClothes[5].src} className="fShoes shoes" />
              </div>
            </div>
          );
        }
      };
      dispatch({
        type: CLOTHES_NEUTRAL_CLOTH_SET,
        payload: neutralClothes,
      });
      dispatch({
        type: CLOTHES_NEUTRAL_PALETTE_SET,
        payload: neutralPalette,
      });
      dispatch({
        type: CLOTHES_FEMME_CLOTH_SET,
        payload: femmeClothes,
      });
      dispatch({
        type: CLOTHES_FEMME_PALETTE_SET,
        payload: femmePalette,
      });

      return (
        <div className="screen">
          <h1>Your suggested outfits</h1>
          <div className="suggestedBody">
            <div className="neutral">
              {renderNeutralGarment()}
              <div className="neutralPalette">{renderNeutralPalette()}</div>
            </div>
            <div className="femme">
              {renderFemmeGarment()}
              <div className="femmePalette">{renderFemmePalette()}</div>
            </div>
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
