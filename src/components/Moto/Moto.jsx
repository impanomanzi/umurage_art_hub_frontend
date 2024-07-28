import "./Moto.css";

function Moto() {
  return (
    <div className="moto-container">
      <span>
        <img src="/images/moto.png" alt="" />
      </span>
      <div>
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
