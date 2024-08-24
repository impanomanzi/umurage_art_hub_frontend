import "./ExhibitionPaintings.css";
import FormNavbar from "../NavBar/FormNavbar";
import ExhibtionPaintingCard from "../ExhibtionPaintingCard/ExhibtionPaintingCard";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../API/serverRequest";
import { Spinner } from "react-bootstrap";
import ThreeGallery from "../ThreeGallery/ThreeGallery";
import useToast from "../../hooks/useToast";
import CommentForm from "../Comment/Comment";
function ExhibitionPaintings() {
  const [show, setShow] = useState(false);
  const { setToast } = useToast();
  const id = useParams().id;
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [paintings, setPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const getPaintings = async () => {
    try {
      const data = await API.getExhibitionPaintings(id);
      if (data.success) {
        setVerified(true);
        setPaintings(data.data);
      } else {
        setToast({ variant: "danger", message: "Forbidden" });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
      navigate("/");
    } finally {
      setIsLoading(false);
    }
  };
  const logout = () => {
    localStorage.removeItem("clientId");
    navigate("/");
  };
  useEffect(() => {
    getPaintings();
  }, []);

  return (
    <>
      <div
        className="exhibition-paintings-container"
        style={{
          position: "relative",
          backgroundColor: "rgba(0, 0, 0, 0.7)",
          minHeight: "100vh",
        }}
      >
        <div className="exhibition-controls">
          <button
            className="btn btn-outline-tertiary btn-danger"
            onClick={() => logout()}
            style={{
              borderRadius: "0px",
            }}
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
          <button
            className="btn btn-outline-secondary-tertiary"
            onClick={() => setShow(!show)}
            style={{
              color: "#ed9b1f",
            }}
          >
            <i className="fa-regular fa-comment"></i>
          </button>
        </div>

        {isLoading && (
          <div
            className="inner-exhibition-paintings-container"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              color: "#fff",
            }}
          >
            <Spinner animation="border" />
          </div>
        )}

        {verified && (
          <div
            style={{ display: isLoading ? "none" : "block" }}
            onLoad={() => setIsLoading(false)}
          >
            <ThreeGallery />
          </div>
        )}
      </div>
      <CommentForm
        show={show}
        onHide={() => setShow(false)}
        exId={useParams().id}
      />
    </>
  );
}

export default ExhibitionPaintings;
