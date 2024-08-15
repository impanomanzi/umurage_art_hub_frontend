import { useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import settings from "../../settings.json";
import FormNavbar from "../../NavBar/FormNavbar";
import "../FormTemplate/FormTemplate.css";
import PhoneInput from "react-phone-input-2";
import { isPossiblePhoneNumber } from "react-phone-number-input";
import MultiStepProgressBar from "../../MultistepProgressBar/MultiStepProgressBar";
import "react-phone-input-2/lib/style.css";
import "./PayementRegistrationForm.css";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";
import { closePaymentModal, useFlutterwave } from "flutterwave-react-v3";

function PayementRegistrationForm() {
  const { setToast } = useToast();
  const exhibitionId = useParams().id;
  const exhibition = useLocation().state?.exhibition;
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const formRef = useRef();
  const navigate = useNavigate();
  const options = ["Registration", "Checkout", "Finish"];
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const config = {
    public_key: settings.public_key,
    tx_ref: Date.now(),
    amount: exhibition?.fees[0],
    currency: "RWF",
    payment_options: "card,mobilemoney",
    customer: {
      email: email,
      phone_number: phoneNumber,
      name: `${firstName} ${lastName}`,
    },
    customizations: {
      title: `${exhibition?.name}`,
      description: `Payment for an exhibition`,
      logo: "https://res.cloudinary.com/dqlv0vkoe/image/upload/v1723699741/amagara/e3biqv7qr11eodteuzpa.png",
    },
  };
  const handleFlutterPayment = useFlutterwave(config);

  const paymentCallback = async (customer, response) => {
    if (response.status === "successful") {
      const formData = new FormData();
      formData.append("customer_id", customer.id);
      formData.append("current_status", "pending");
      formData.append("e_name", exhibition.id);
      try {
        const response = await fetch(
          `${settings.server_domain}/update_customer_status`,
          {
            method: "POST",
            body: formData,
          }
        );
        const resp = await response.json();
        if (resp.success) {
          navigate(`/check_payment/${exhibition.id}`);
        }
      } catch (error) {
        setToast({ variant: "danger", message: error.message });
      }
    }
    setIsLoading(false);
    closePaymentModal();
  };

  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };

  const handleOnSubmit = async (event) => {
    try {
      setIsLoading(true);
      event.preventDefault();
      if (!isPossiblePhoneNumber("+" + phoneNumber)) {
        throw new Error("Phone number is invalid");
      }
      const formData = new FormData();
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
      const resp = await response.json();
      if (resp.success) {
        setActiveTab(1);

        handleFlutterPayment({
          callback: (response) => paymentCallback(resp.data[0], response),
          onClose: () => {
            setIsLoading(false); // Ensure loading stops if modal is closed
          },
        });
      } else {
        throw new Error(resp.message);
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
      setIsLoading(false); // Stop loading in case of error
    }
  };

  return (
    <>
      <FormNavbar />
      <div className="form-outer-container">
        <div className="form-inner-container">
          <div>
            <h2 id="customer-form-header">PAYMENT INFORMATION</h2>
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
                containerClass="form-control"
              />
            </div>
            <div className="form-group">
              <CustomLoadingButton
                isLoading={isLoading}
                onClick={null}
                text="Pay"
                buttonType="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default PayementRegistrationForm;
