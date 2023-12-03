import React from "react";
import "./LeftSideBarMenu.css";

function LeftSideBarMenu() {
  let menuItems = [
    { item: "New", callBack: null },
    { item: "Views", callBack: null },
    { item: "comments", callBack: null },
    { item: "Payements", callBack: null },
    { item: "Settings", callBack: null },
  ];
  return (
    <div className="left-sidebar-menu">
      {menuItems.map((item, index) => {
        return <button>{item.item}</button>;
      })}
    </div>
  );
}

export default LeftSideBarMenu;
