import { useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import settings from "../../settings.json";
import CheckoutForm from "../../CheckoutForm/CheckoutForm";
import FormNavbar from "../../NavBar/FormNavbar";
import "../FormTemplate/FormTemplate.css";
import PhoneInput from "react-phone-input-2";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import MultiStepProgressBar from "../../MultistepProgressBar/MultiStepProgressBar";
import "react-phone-input-2/lib/style.css";
import "./PayementRegistrationForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import { toast } from "react-hot-toast";
function PayementRegistrationForm() {
  const exhibitionId = useParams().id;
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const formRef = useRef();
  const respRef = useRef();
  const options = ["Registration", "Checkout", "Finish"];

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };
  const handleOnSubmit = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      if (!isPossiblePhoneNumber("+" + phoneNumber)) {
        throw new Error("phone number is invalid");
      }
      document.querySelector(".response-alert").innerHTML = "";
      let formData = new FormData();
      formData.append("firstname", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phonenumber", phoneNumber);
      formData.append("exhibition", exhibitionId);
      formData.append("datetime", new Date().toLocaleString());
      const response = await fetch(`${settings.server_domain}/add_customer`, {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        setActiveTab(1);
        setShowCheckoutForm(true);
        formRef.current.reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div>
            <h2>COMPLETE INFORMATION</h2>
            <MultiStepProgressBar activeElement={activeTab} options={options} />
          </div>
          <form onSubmit={handleOnSubmit} ref={formRef}>
            <div className="form-group">
              <label htmlFor="first_name" className="col-form-label">
                FIRST NAME
              </label>
              <input
                type="text"
                name="name"
                required
                autoComplete="off"
                onChange={(event) => {
                  setFirstName(event.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="last_name" className="col-form-label">
                LAST NAME
              </label>
              <input
                type="text"
                name="last_name"
                required
                onChange={(event) => {
                  setLastName(event.target.value);
                }}
                className="form-control"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="col-form-label">
                EMAIL
              </label>
              <input
                name="email"
                type="email"
                required
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <label htmlFor="phone" className="col-form-label">
                PHONE
              </label>
              <PhoneInput
                country={"rw"}
                value={phoneNumber}
                onChange={handleOnChange}
                inputProps={{
                  required: true,
                }}
                className="phone-form-control"
              />
            </div>
            <div className="form-group">
              <CustomLoadingButton
                isLoading={isLoading}
                onClick={null}
                text="Submit"
                buttonType="submit"
              />
            </div>
          </form>
        </div>
      </div>
      {showCheckoutForm && (
        <div className="checkout-form-container">
          {/* <CheckoutForm
            c_id={responseData.data[0].id}
            id={exhibitionId}
            firstName={firstName}
            lastName={lastName}
            email={email}
            phoneNumber={phoneNumber}
            exhibitionName={wanted.name}
            amount={wanted.fees}
            navigate={navigate}
            diminishProgress={() => {
              setActiveTab(0);
            }}
            updateProgress={() => {
              setActiveTab(2);
              setActiveTab(3);
            }}
          /> */}
          <div className="alert alert-success">
            <h1>
              <i className="fas fa-check-circle"></i>
              Success
            </h1>
            Thank you making registration to attend our exhibition. <br />
            Please check your email for more info.
          </div>
        </div>
      )}
    </>
  );
}

export default PayementRegistrationForm;
