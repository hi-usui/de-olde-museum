export const navigatorNext = (navigate, currentUrl) => {
  switch (currentUrl) {
    case "/screen1":
      navigate("/screen2");
      break;
    case "/screen2":
      navigate("/screen3");
      break;
    case "/screen3":
      navigate("/screen4");
      break;

    default:
      return state;
  }
};
