import SidebarButton from "components/SidebarButton";
import React from "react";

export default () => {
  return (
    <div className="Sidebar">
      <SidebarButton title="1" subtitle="Choose Artwork" />
      <SidebarButton title="2" subtitle="Select Color" />
      <SidebarButton title="3" subtitle="View Outfits" />
    </div>
  );
};
