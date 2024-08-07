import "./ExhibitionPaintings.css";
import FormNavbar from "../NavBar/FormNavbar";
import ExhibtionPaintingCard from "../ExhibtionPaintingCard/ExhibtionPaintingCard";
import { toast } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { API } from "../../API/serverRequest";
import { Spinner } from "react-bootstrap";
import ThreeGallery from "../ThreeGallery/ThreeGallery";
function ExhibitionPaintings() {
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
      }
    } catch (error) {
      toast.error(String(error));
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
      <FormNavbar />
      <div className="exhibition-paintings-container">
        {isLoading && (
          <div className="inner-exhibition-paintings-container">
            <Spinner animation="border" />
          </div>
        )}

        {
          verified && <ThreeGallery />
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
    </>
  );
}

export default ExhibitionPaintings;
