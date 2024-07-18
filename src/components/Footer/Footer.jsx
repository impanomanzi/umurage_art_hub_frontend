import { BsInstagram } from "react-icons/bs";
import { BsMailbox2 } from "react-icons/bs";
import { BsWhatsapp } from "react-icons/bs";
import "./Footer.css";
function Footer() {
  return (
    <div className="footer-outer gutters">
      <a
        href="#"
        style={{
          position: "fixed",
          bottom: "12%",
          right: "1vw",

          zIndex: "1",
        }}
      >
        <button
          className="btn btn-primary rounded-circle"
          style={{ width: "50px", height: "50px" }}
        >
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
              <a href="https://www.instagram.com/_isaiee_?gsh=MzRIODBiNWFIZA==">
                <BsInstagram />
              </a>
            </span>
            <span>
              <a href="https://wa.me/+8615619381006">
                <BsWhatsapp />
              </a>
            </span>
            <span>
              <a href="mailto:rukundoprince04@gmail.com">
                <BsMailbox2 />
              </a>
            </span>
            <span>
              <a href="/privacy.html">Privacy policy</a>
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
