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
          <button>Back top</button>
        </a>
      </div>
      <div className="footer">
        <div className="social-medias">
          <span>
            <h3>Our Social Medias</h3>
          </span>
          <hr />
          <div>
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
        <div className="links">
          <span>
            <h3>Work with us</h3>
          </span>
          <hr />
          <div>
            <span>
              <a href="#">Sell</a>
            </span>
            <span>
              <a href="#">Advertise</a>
            </span>
            <span>
              <a href="#">Buy</a>
            </span>
            <span>
              <a href="#">Referals</a>
            </span>
            <span>
              <a href="#">Join us</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
