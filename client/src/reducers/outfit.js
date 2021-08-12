import {
  CLOTHES_FEMME_CLOTH_SET,
  CLOTHES_FEMME_PALETTE_SET,
  CLOTHES_NEUTRAL_CLOTH_SET,
  CLOTHES_NEUTRAL_PALETTE_SET,
} from "actions/_index";

const initialState = { femme: {}, neutral: {} };

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOTHES_FEMME_CLOTH_SET:
      return {
        ...state,
        femme: { ...state.femme, clothes: action.payload },
      };
    case CLOTHES_FEMME_PALETTE_SET:
      return {
        ...state,
        femme: { ...state.femme, palette: action.payload },
      };
    case CLOTHES_NEUTRAL_CLOTH_SET:
      return {
        ...state,
        neutral: { ...state.neutral, clothes: action.payload },
      };
    case CLOTHES_NEUTRAL_PALETTE_SET:
      return {
        ...state,
        neutral: { ...state.neutral, palette: action.payload },
      };
    default:
      return state;
  }
}
