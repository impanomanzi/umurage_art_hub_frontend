import React from "react";

const closeAlert = (event) => {
  document.querySelector(".response-alert").innerHTML = "";
};
export const AlertSuccess = (message) => {
  let el = document.createElement("div");
  el.classList.add("alert");
  el.classList.add("alert-success");
  let btn = document.createElement("button");

  btn.classList.add("btn");
  btn.classList.add("btn-close");
  btn.addEventListener("click", closeAlert);
  el.append(btn);
  let tel = document.createElement("span");
  tel.textContent = message;
  el.append(tel);
  return el;
};

export const WarningAlert = (message) => {
  let el = document.createElement("div");
  el.classList.add("alert");
  el.classList.add("alert-warning");
  let btn = document.createElement("button");

  btn.classList.add("btn");
  btn.classList.add("btn-close");
  btn.addEventListener("click", closeAlert);
  el.append(btn);
  let tel = document.createElement("span");
  tel.textContent = message;
  el.append(tel);
  return el;
};

export const AlertError = (message) => {
  let el = document.createElement("div");
  el.classList.add("alert");
  el.classList.add("alert-danger");
  let btn = document.createElement("button");

  btn.classList.add("btn");
  btn.classList.add("btn-close");
  btn.addEventListener("click", closeAlert);
  el.append(btn);
  let tel = document.createElement("span");
  tel.textContent = message;
  el.append(tel);
  return el;
};
