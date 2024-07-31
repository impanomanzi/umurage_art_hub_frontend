import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./ProfileBottomNav.css";

function ProfileBottomNav(props) {
  const [isVisible, setIsVisible] = useState(true);
  let lastScrollTop = 0;

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > lastScrollTop) {
      // Scrolling down
      setIsVisible(false);
    } else {
      // Scrolling up
      setIsVisible(true);
    }

    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array to run only on mount

  return (
    <div
      className={`profile-bottom-nav-container ${
        isVisible ? "visible" : "hidden"
      }`}
    >
      <div className="home-area">
        <Link className="btn btn-primary" to={"paintings"}>
          <i className="fas fa-home"></i>
        </Link>
      </div>
      <div className="add-area">
        <Link className="btn btn-primary" to={"paintings/add_painting"}>
          <i className="fas fa-plus"></i>
        </Link>
      </div>
      <div className="contact-area">
        <Link className="btn btn-primary" to={"profile"}>
          <i className="fas fa-user-circle"></i>
        </Link>
      </div>
    </div>
  );
}

export default ProfileBottomNav;
