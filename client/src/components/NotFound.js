import React from "react";
import { useBack } from "use-back";

export default () => {
  const { hasBack, handleBack } = useBack();

  return (
    <div className="NotFound">
      <h1>Page Not Found</h1>
      <p>Sorry, this page does not exist</p>
      <button type="button" onClick={handleBack}>
        {hasBack ? "Go Back" : "Home"}
      </button>
    </div>
  );
};
