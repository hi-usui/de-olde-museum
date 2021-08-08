import SidebarTab from "components/SidebarTab";
import React from "react";

export default () => {
  return (
    <div className="Sidebar">
      <SidebarTab title="1" subtitle="Choose Artwork" />
      <SidebarTab title="2" subtitle="Select Color" />
      <SidebarTab title="3" subtitle="View Outfits" />
      <SidebarTab title="4" subtitle="Save to Phone" />
    </div>
  );
};
