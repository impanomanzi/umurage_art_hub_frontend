import React from "react";
import { BsTwitter } from "react-icons/bs";
import { SiLinkedin } from "react-icons/si";
import { BsYoutube } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-container">
      <div className="back-top">
        <a href="#top">
          <button className="btn btn-outline-primary">Back top</button>
        </a>
      </div>
      <div className="footer">
        <span>
          <h3>Umurage art hub LTD</h3>
          <hr />
        </span>
        <div className="socials">
          <span>
            <BsTwitter />
            &nbsp;<b>@E-painitingRRwanda</b>
          </span>
          <span>
            <SiLinkedin />
            &nbsp;<b>painitingRRwanda</b>
          </span>
          <span>
            <BsYoutube />
            &nbsp;<b>painitingRRwanda</b>
          </span>
          <span>
            <BsFacebook />
            &nbsp;<b>painitingRRwanda</b>
          </span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
