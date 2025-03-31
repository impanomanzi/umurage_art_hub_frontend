

import "./Footer.css";

function Footer() {
  
  return (
    <div className="footer-outer gutters">
     
      {isVisible && (
        <a
          className="btn btn-primary"
          href="#"
          onClick={scrollToTop}
          style={{
            position: "fixed",
            bottom: "12%",
            right: "1vw",
            zIndex: "1",
            width: "50px",
            height: "50px",
            backgroundColor: "transparent",
          }}
        >
          <i className="fas fa-arrow-up"></i>
        </a>
      )}
      
     
      <div className="footer-container">
        <div className="footer">
          <span>
            <h3>Umurage Art Hub</h3>
            <hr />
          </span>
          <div className="socials">
            <span>
              <a href="https://www.instagram.com/_isaiee_?gsh=MzRIODBiNWFIZA==">
                <i className="fab fa-instagram"></i>
              </a>
            </span>
            <span>
              <a href="https://wa.me/+254724299950">
                <i className="fab fa-whatsapp"></i>
              </a>
            </span>
            <span>
              <a href="mailto:niyomugaboisaie05@gmail.com">
                <i className="far fa-envelope"></i>
              </a>
            </span>
            <span>
              <a href="/privacy.html">Privacy Policy</a>
            </span>
          </div>
        </div>
        <center style={{ color: "White" }}>
          <a
            href="https://impanomanzienock.onrender.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i>Developed by: Rafiki</i>
          </a>
        </center>
      </div>
    </div>
  );
}

export default Footer;
