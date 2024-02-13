import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./Announcement.css";

function Announcement() {
  const announcements = ["this website is still under development"];

  const startAnimation = () => {
    const scrollers = document.querySelectorAll(".scroller");
    scrollers.forEach((scroller, key) => {
      scroller.setAttribute("data-animated", true);
      const scroller_inner = scroller.querySelector(".inner-scroller");
      const scrollerContent = Array.from(scroller_inner.children);
      scrollerContent.forEach((item, index) => {
        const duplicatedItem = item.cloneNode(true);
        duplicatedItem.setAttribute("aria-hidden", true);
        scroller_inner.appendChild(duplicatedItem);
      });
    });
  };
  //   const [startA, setStart] = useState(start);
  const start = () => {
    if (!window.matchMedia("(prefers-reduced-motion:reduce)").matches) {
      startAnimation();
    } else {
      startAnimation();
    }
    startAnimation();
  };

  return (
    <div className="scroller-container">
      <ul class="scroller" data-direction="left" data-speed="slow">
        <div class="inner-scroller">
          {announcements.map((item, index) => {
            return <li key={index}>{item}</li>;
          })}
        </div>
        {start()}
      </ul>
    </div>
  );
}

export default Announcement;
