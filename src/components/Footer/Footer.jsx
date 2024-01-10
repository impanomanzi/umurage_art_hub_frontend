import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-outer gutters">
      <a
        href="#top"
        style={{
          position: "fixed",
          bottom: "6%",
          right: "3%",
          zIndex: "1",
          padding: "1em",
        }}
      >
        <button className="btn btn-primary rounded-circle">
          <i className="fas fa-arrow-up"></i>
        </button>
      </a>
      <div className="footer-container">
        <div className="footer">
          <span>
            <h3>Umurage art hub</h3>
            <hr />
          </span>
          <div className="socials">
            <span>
              <BsTwitter />
            </span>
            <span>
              <SiLinkedin />
            </span>
            <span>
              <BsYoutube />
            </span>
            <span>
              <BsFacebook />
            </span>
          </div>
        </div>
        <center style={{ color: "White" }}>
          <a href="https://impanomanzienock.onrender.com" target="_blank">
            <i>Developed by: Rafiki</i>
          </a>
        </center>
      </div>
    </div>
  );
}

export default Footer;
