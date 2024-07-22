import { useState } from "react";
import FormNavbar from "../../NavBar/FormNavbar";
import { useNavigate, useParams } from "react-router-dom";
import CustomLoadingButton from "../../FormButton/FormButton";
import "../FormTemplate/FormTemplate.css";
import { API } from "../../../API/serverRequest";

function CheckPaymentForm() {
  const id = useParams().id;
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
  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div className="form-header">
            <h2>CUSTOMER ENTRY</h2>
            <div className="message"></div>
          </div>
          <form
            className="row col-md-5 justify-content-center"
            style={{ marginLeft: "1em" }}
            onSubmit={handleOnSubmit}
          >
            <div className="form-group">
              <label>Secret key</label>
              <input
                type="text"
                required
                className="form-control"
                onChange={(event) => {
                  setCustomerId(event.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <CustomLoadingButton
                isLoading={isLoading}
                onClick={null}
                text="Sign in"
                buttonType="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default CheckPaymentForm;
