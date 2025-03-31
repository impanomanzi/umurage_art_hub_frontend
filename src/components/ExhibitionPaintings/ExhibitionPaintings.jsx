import "./ExhibitionPaintings.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../API/serverRequest";
import { Spinner } from "react-bootstrap";
import ThreeGallery from "../ThreeGallery/ThreeGallery";
import useToast from "../../hooks/useToast";
import CommentForm from "../Comment/Comment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment} from "@fortawesome/free-solid-svg-icons";
import useMoto from "../../hooks/useMoto";
import LogoutConfirmDialog from "../Dialogs/LogoutConfirmDialog/LogoutConfirmDialog";

function ExhibitionPaintings() {
  const [showDialog, setShowDialog]= useState(false)
  const{setViewMoto}= useMoto()
  const [show, setShow] = useState(false);
  const custId= localStorage.getItem("clientId");
  const { setToast } = useToast();
  const id = useParams().id;
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);


  const getPaintings = async () => {
    try {
      const data = await API.getExhibitionPaintings(id);
      if (data.success) {
        setVerified(true);
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
    setViewMoto(false)
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
            onClick={() => setShowDialog(!showDialog)}
            style={{
              borderRadius: "0px",
            }}
          >
            <i className="fa-solid fa-power-off"></i>
          </button>
          <button
            className="btn btn-primary"
            onClick={() => setShow(!show)}
            
          >
           <FontAwesomeIcon icon={faComment} />
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
            <ThreeGallery id={id} custId={custId} />
          </div>
        )}
      </div>
      <CommentForm
        show={show}
        onHide={() => setShow(false)}
        exId={useParams().id}
      />
      <LogoutConfirmDialog onClick={logout} showModal={showDialog} onClose={()=>setShowDialog(!showDialog)}/>
    </>
  );
}

export default ExhibitionPaintings;
