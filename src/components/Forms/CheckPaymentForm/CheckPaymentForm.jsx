import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import CustomLoadingButton from "../../FormButton/FormButton";
import { API } from "../../../API/serverRequest";
import "./CheckPaymentForm.css"
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function CheckPaymentForm() {
  const id = useParams().id;
  const location = useLocation();
  const state = location.state || {};
  const navigate = useNavigate();
  const [customerId, setCustomerId] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("exhibitionId", id);
      formData.append("customerId", customerId);
      const resp = await API.checkPayment(formData);
      if (resp.success) {
        localStorage.setItem("clientId", resp.c_id);
        navigate(`/exhibition_paintings/${resp.id}`);
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      document.querySelector(
        ".message"
      ).innerHTML = ` <div class="alert alert-danger">
              <center>
                <p class="lead">
                ${String(error)}
                </p>
              </center>
            </div>`;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (state.message) {
      document.querySelector(
        ".message"
      ).innerHTML = ` <div class="alert alert-info">
              <center>
                <p class="lead">
                ${state.message}
                </p>
              </center>
            </div>`;
    }
  }, []);
  return (
    <>
     <Helmet>
        <title>Sign in exhibition</title>
        <meta
          name="description"
          content="Exhibition sign in"
        />
        <meta
          name="keywords"
          content="Virtual Art Gallery, Online Art Exhibitions, Digital Art Gallery, Virtual Exhibition Space, Rwandan Art, Umurage Art Hub"
        />
      </Helmet>
      <div className="check-main-section">
      <div className="check-form-container" >
      <Link to="/"><img src="/UMURAGE HEADER.png" alt="" /></Link>
        <div className="check-form-inner-container">
          <div>
            <h2>Sign in
            </h2>
            <div className="message"></div>
          </div>
          <form
            onSubmit={handleOnSubmit}
          >
            <div className="check-form-group">
              <label>Enter your key</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={(event) => {
                  setCustomerId(event.target.value);
                }}
              />
            </div>
            <div className="check-form-group">
              <CustomLoadingButton
                isLoading={isLoading}
                onClick={null}
                text="Continue"
                buttonType="submit"
              />
            </div>
            <p>By creating an account, you agree to Umurage Art Hub's Conditions of Use and Privacy Notice.</p>
            <p>
            Already have an account? <Link
                to={`/payment/${id}`}
                 
          
              >
                Register
              </Link></p>
          </form>
        </div>
      </div>
      </div>
    </>
  );
}

export default CheckPaymentForm;
