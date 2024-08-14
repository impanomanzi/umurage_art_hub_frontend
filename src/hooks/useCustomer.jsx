import React from "react";

function useCustomer() {
  return localStorage.getItem("clientId");
}

export default useCustomer;
