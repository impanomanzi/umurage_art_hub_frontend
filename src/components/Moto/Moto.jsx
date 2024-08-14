import "./Moto.css";
import { useEffect, useState } from "react";
function Moto() {
  const [isVisible, setIsVisible] = useState(false);
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="moto-container">
      <span>
        <img src="/images/moto.png" alt="" />
      </span>
      <div>
        {isVisible && (
          <a
            className="btn btn-primary rounded-circle"
            href="#"
            onClick={scrollToTop}
            style={{
              position: "fixed",
              bottom: "12%",
              right: "1vw",
              zIndex: "1",
              width: "50px",
              height: "50px",
            }}
          >
            <i className="fas fa-arrow-up"></i>
          </a>
        )}

        <div className="links">
          <a href="https://www.instagram.com/_isaiee_?gsh=MzRIODBiNWFIZA==">
            <i class="fab fa-instagram"></i>
          </a>

          <a href="https://wa.me/+254724299950">
            <i class="fab fa-whatsapp"></i>
          </a>

          <a href="mailto:niyomugaboisaie05@gmail.com">
            <i class="far fa-envelope"></i>
          </a>

          <a href="/privacy.html">Privacy policy</a>
        </div>
      </div>
      <p>&copy; Umurage Art Hub 2024</p>
    </div>
  );
}

export default Moto;
