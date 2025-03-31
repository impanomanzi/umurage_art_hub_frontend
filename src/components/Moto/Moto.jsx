import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ContactForm from "../Forms/ContactForm/ContactForm";
import "./Moto.css";
import useMoto from "../../hooks/useMoto";
function Moto() {
  const{viewMoto}= useMoto()
  const [showModal, setShowModal] = useState(false);
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
  return  viewMoto&&<footer className="moto-container">
  <ContactForm showModal={showModal} onClose={()=>setShowModal(!showModal)} />
   <Button className="message-button float-button" variant="primary"  onClick={()=>setShowModal(!showModal)} aria-label="message-button"  >
    <FontAwesomeIcon icon={faEnvelope} />
  </Button>
 
    {isVisible && (
      <a
        className="top-btn"
        href="#"
        onClick={scrollToTop}
        style={{
          position: "fixed",
          bottom: "12%",
          right: "1vw",
          zIndex: "1",
          width: "50px",
          height: "50px",
          zIndex:1000
        }}
      >
        <i className="fas fa-arrow-up"></i>
      </a>
    )}

    <div className="copyright">
      &copy; Copyright <strong>Umurage Art Hub.</strong> All Rights Reserved
    </div>
    <div className="credits">
      Designed by IMPANO MANZI Enock
    </div>
  
</footer>
}

export default Moto;
