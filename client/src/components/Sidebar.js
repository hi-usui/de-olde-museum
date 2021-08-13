import SidebarTab from "components/SidebarTab";
import React from "react";
import { useSelector } from "react-redux";

export default () => {
  const page = useSelector((state) => state.page);
  const sidebar = [
    "Choose Artwork",
    "Select Color",
    "View Outfits",
    "Save to Phone",
  ];
  return (
    <div className="Sidebar">
      {sidebar.map((subtitle, index) => (
        <SidebarTab
          active={index < page}
          title={index + 1}
          subtitle={subtitle}
        />
      ))}
    </div>
  );
};
