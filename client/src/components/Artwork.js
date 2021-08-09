import React, { useState } from "react";

export default () => {
  const [click, useClick] = useState(false);
  return <div onClick={() => useClick(!click)}>Artwork, clicked: {click}</div>;
};
