import React from "react";
import "../ProfileHome/ProfileHome.css";
import LeftSideBarMenu from "../LeftSideBarMenu/LeftSideBarMenu";
import HomeProjectCard from "../HomeProjectCard/HomeProjectCard.css";

function ProfileHome() {
  let projects = [
    {
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Praesentium adipisci sapiente facere libero rem numquam enim ducimus
  veniam vero optio ad animi quas, blanditiis nihil accusantium
  officia eveniet perferendis molestiae?`,
      image: "/public/images/iconic.png",
    },
    {
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Praesentium adipisci sapiente facere libero rem numquam enim ducimus
  veniam vero optio ad animi quas, blanditiis nihil accusantium
  officia eveniet perferendis molestiae?`,
      image: "/public/images/iconic.png",
    },
    {
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Praesentium adipisci sapiente facere libero rem numquam enim ducimu
  veniam vero optio ad animi quas, blanditiis nihil accusantium
  officia eveniet perferendis molestiae?`,
      image: "/public/images/iconic.png",
    },
    {
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Praesentium adipisci sapiente facere libero rem numquam enim ducimus
  veniam vero optio ad animi quas, blanditiis nihil accusantium
  officia eveniet perferendis molestiae?`,
      image: "/public/images/iconic.png",
    },
    {
      description: `Lorem ipsum dolor sit amet consectetur, adipisicing elit.
  Praesentium adipisci sapiente facere libero rem numquam enim ducimus
  veniam vero optio ad animi quas, blanditiis nihil accusantium
  officia eveniet perferendis molestiae?`,
      image: "/public/images/iconic.png",
    },
  ];
  return (
    <div className="home-container">
      <div className="left-sidebar">
        <LeftSideBarMenu />
      </div>
      <div className="home-main-content">
        {projects.map((project, index) => {
          return <HomeProjectCard project={project} key={index} />;
        })}
      </div>
      <div className="right-sidebar">
        <span>
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
        </span>
        <span>
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
          Lorem ipsum dolor sit amet consecte
          <br />
        </span>
      </div>
    </div>
  );
}

export default ProfileHome;
