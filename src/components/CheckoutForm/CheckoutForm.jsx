import { useState } from "react";
import settings from "../settings.json";
import "./CheckoutForm.css";
import { loading, unload } from "../ButtonEffects/ButtonEffects";
import { toast } from "react-hot-toast";

function CheckoutForm(props) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isMTN, setIsMTN] = useState(false);
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [isAirtel, setIsAirtel] = useState();
  const detectPhonenuber = (event) => {
    if (
      event.target.value.startsWith("079") |
      event.target.value.startsWith("078")
    ) {
      setIsMTN(true);
      if (event.target.value.length == 10) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
    } else if (
      event.target.value.startsWith("072") |
      event.target.value.startsWith("073")
    ) {
      setIsAirtel(true);
    } else {
      setIsMTN(false);
      setIsAirtel(false);
    }
  };
  const make_mtn_payment = async (event) => {
    event.preventDefault();
    loading(".check-submit-btn");
    let formData = new FormData();
    formData.append("c_id", props.c_id);
    formData.append("phonenumber", phoneNumber);
    formData.append("amount", props.amount);
    formData.append("ex_id", props.id);
    setBtnDisabled(true);
    try {
      const response = await fetch(`${settings.server_domain}/request_to_pay`, {
        method: "POST",
        headers: {
          encType: "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        localStorage.setItem("clientId", props.c_id);
        props.navigate(`/exhibition_paintings/${props.id}`);
      } else {
        document.querySelector(".check-submit-btn").innerHTML = `
        <img
        src="https://momodeveloper.mtn.com/content/mtnmomoLogo.svg"
        height="32px"
        width={"32px"}
      />
      Pay With MTN Mobile Money
     `;
        document.querySelector(".check-submit-btn").disabled = false;
        toast.error(data.error);
        setBtnDisabled(false);
      }
    } catch (error) {
      document.querySelector(".check-submit-btn").innerHTML = `
       <img
         src="https://momodeveloper.mtn.com/content/mtnmomoLogo.svg"
         height="50px"
         width={"50px"}
       />
       Pay via MoMo
     `;

      toast.error(error.toString());
      setBtnDisabled(false);
    }
  };

  return (
    <div className="checkout-container-outer">
      <div>
        <h2>CHECKOUT</h2>

        <hr />

        <form className="row" onSubmit={make_mtn_payment}>
          <p className="h3">Invoice data</p>
          <div className="form-group">
            <label htmlFor="first_name">FIRST NAME</label>
            <input
              type="text"
              name="first-name"
              autoComplete="off"
              value={props.firstName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="last_name">LAST NAME</label>
            <input
              type="text"
              name="last_name"
              value={props.lastName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input
              name="email"
              type="email"
              value={props.email}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="exhibition_name">EXHIBITION NAME</label>
            <input
              name="exhibitionName"
              type="text"
              value={props.exhibitionName}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />

          <div className="form-group">
            <label htmlFor="amount">AMOUNT</label>
            <input
              name="amount"
              type="text"
              value={props.amount}
              disabled
              className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="form-group">
            <label htmlFor="phone">PHONE</label>
            <input
              name="exhibitionName"
              type="text"
              value={phoneNumber}
              required
              selected
              onChange={(event) => {
                setPhoneNumber(event.target.value);
                detectPhonenuber(event);
              }}
              // className="form-control-plaintext"
              style={{ fontWeight: "900", fontSize: "1.2em" }}
            />
          </div>
          <hr />
          <div className="row justify-content-center" role="group">
            {isMTN && (
              <button
                href={`tel:*182*8*1*798732#`}
                type="submit"
                className="mtn btn btn-secondary check-submit-btn mtn-submit-btn"
                id="pay-button1"
                disabled={btnDisabled}
              >
                <img
                  src="https://momodeveloper.mtn.com/content/mtnmomoLogo.svg"
                  height="32px"
                  width={"32px"}
                />
                Pay With MTN Mobile Money
              </button>
            )}
            {/* {isAirtel && (
              <button className="airtel btn btn-secondary" type="submit">
                Pay With Airtel Money
              </button>
            )} */}

            {/* <PaypalButton
            productInfo={{
              c_id: props.c_id,
              exId: props.id,
              phone: props.phoneNumber,
              name: productName,
              quantity: productQuantity,
              price: productPrice,
            }}
            navigate={props.navigate}
          /> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default CheckoutForm;
