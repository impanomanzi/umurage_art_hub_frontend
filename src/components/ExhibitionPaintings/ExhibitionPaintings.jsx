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
      <div className="exhibition-paintings-container">
        <div className="exhibition-controls">
          <button
            className="btn btn-outline-tertiary btn-danger"
            onClick={() => logout()}
            style={{
              borderRadius: "0px",
            }}
          >
            <i class="fa-solid fa-power-off"></i>
          </button>
          <button
            className="btn btn-outline-secondary-tertiary"
            onClick={() => setShow(!show)}
            style={{
              color: "#ed9b1f",
            }}
          >
            <i class="fa-regular fa-comment"></i>
          </button>
        </div>
        {isLoading && (
          <div className="inner-exhibition-paintings-container">
            <Spinner animation="border" />
          </div>
        )}

        {
          verified && <ThreeGallery />
          // <ThreeGallery />
          // <div/>
          /* <div
              className="logout-container"
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginRight: "1em",
              }}
            >
              <button className="btn btn-outline-primary" onClick={logout}>
                <i className="fas fa-logout"></i> Sign out
              </button>
            </div>

            <div className="inner-exhibition-paintings-container">
              {paintings.map((item, index) => {
                return (
                  <ExhibtionPaintingCard
                    item={item}
                    key={index}
                    exhibition={id}
                  />
                );
              })}
            </div>
          </div> */
        }
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
