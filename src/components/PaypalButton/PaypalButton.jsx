// import React from "react";
import React, { useState } from "react";
import settings from "../settings.json";
import ReactDOM from "react-dom/client";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { useNavigate } from "react-router-dom";

function PaypalButton(props) {
  const navigate = props.navigate;
  const paypalInitialOptions = {
    "client-id":
      "ATXE7I-Cou4tO1E9__yFBYMxdsx_p4cuzWTLd58CCBCRCl8kCLfyf2aOPptkY1xodLyYaicBMtWPaDC2",

    "enable-funding": "paylater,venmo,card",

    "disable-funding": "",

    "data-sdk-integration-source": "integrationbuilder_sc",
  };
  return (
    <div>
      <PayPalScriptProvider options={paypalInitialOptions}>
        <PayPalButtons
          style={{
            shape: "rect",

            layout: "vertical",
          }}
          createOrder={async () => {
            try {
              let formData = new FormData();
              formData.append("c_id", props.productInfo.c_id);
              formData.append("exId", props.id);
              formData.append("phone", props.phoneNumber);
              formData.append("name", props.productInfo.name);
              formData.append("quantity", props.productInfo.quantity);
              formData.append("price", props.productInfo.price);
              const response = await fetch(
                `${settings.server_domain}/api/payment/create-paypal-order`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: formData,
                }
              );
              const orderData = await response.json();
              console.log(orderData);
              if (orderData.id) {
                console.log(orderData.id);
                return orderData.id;
              } else {
                const errorDetail = orderData?.details?.[0];

                const errorMessage = errorDetail
                  ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                  : JSON.stringify(orderData);

                throw new Error(errorMessage);
              }
            } catch (error) {
              console.log(error);
            }
          }}
          onApprove={async (data, actions) => {
            try {
              let formData = new FormData();
              formData.append("c_id", props.productInfo.c_id);
              formData.append("exId", props.id);
              formData.append("phone", props.phoneNumber);
              formData.append("name", props.productInfo.name);
              formData.append("quantity", props.productInfo.quantity);
              formData.append("price", props.productInfo.price);
              const response = await fetch(
                `${settings.server_domain}/api/payment/capture_order/${data.orderID}`,
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
              );
              const orderData = await response.json();
              const errorDetail = orderData?.details?.[0];
              if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

                // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

                return actions.restart();
              } else if (errorDetail) {
                // (2) Other non-recoverable errors -> Show a failure message
                ReactDOM.createRoot(
                  document.querySelector(".checkout-message")
                ).render(
                  <div className="alert alert-danger">
                    <center>
                      <p>"Payment failure; Try again."</p>
                    </center>
                  </div>
                );

                throw new Error(
                  `${errorDetail.description} (${orderData.debug_id})`
                );
              } else {
                // (3) Successful transaction -> Show confirmation or thank you message

                // Or go to another URL:  actions.redirect('thank_you.html');
                let formData = new FormData();
                formData.append("c_id", props.productInfo.c_id);
                formData.append("exId", props.id);
                formData.append("phone", props.phoneNumber);
                formData.append("name", props.productInfo.name);
                formData.append("quantity", props.productInfo.quantity);
                formData.append("price", props.productInfo.price);
                let response = await fetch(
                  `${settings.server_domain}/confirm_payment`,
                  { method: "POST", body: formData }
                );
                let data = await response.json();
                if (data.success) {
                  localStorage.setItem("clientId", customerId);
                  navigate(`/exhibition_paintings/${props.id}`);
                }
                // const transaction = console.log(
                //   orderData.purchase_units[0].payments.captures[0]
                // );

                // console.log(
                //   "Capture result",

                //   orderData,

                //   JSON.stringify(orderData, null, 2)
                // );
              }
            } catch (error) {
              console.error(error);

              console.log(error);
            }
          }}
        ></PayPalButtons>
      </PayPalScriptProvider>
    </div>
  );
}

export default PaypalButton;
