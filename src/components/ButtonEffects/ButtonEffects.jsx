export const loading = (el) => {
  const centerEl = document.createElement("center");
  const divEl = document.createElement("div");
  divEl.classList.add("spinner-border");
  divEl.setAttribute("role", "status");
  const spanEl = document.createElement("span");
  spanEl.classList.add("sr-only");
  spanEl.textContent = "Loading ...";
  centerEl.append(divEl);
  divEl.append(spanEl);
  document.querySelector(el).disabled = true;
  document.querySelector(el).replaceChildren(centerEl);
};

export const unload = (el, name) => {
  document.querySelector(el).replaceChildren(name);
  document.querySelector(el).disabled = false;
};
