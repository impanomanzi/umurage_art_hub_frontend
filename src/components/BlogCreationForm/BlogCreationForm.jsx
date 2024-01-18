import React from "react";
import { useState } from "react";
import "../FormTemplate/FormTemplate.css";
import settings from "../settings.json";
function BlogCreationForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  let body = { title, content };
  let options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  };
  const handleOnSubmit = (event) => {
    event.preventDefault();
    fetch(`${settings.server_domain}/api/blog/add_new_blog`, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.success) console.info("New blog submitted succcessfully");
        else console.error(data.success);
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="payment-registration-form-container m-3">
      <h2>CREATE NEW BLOG</h2>
      <hr />

      <form onSubmit={handleOnSubmit}>
        <div className="form-group">
          <label htmlFor="title" className="col-sm-2 col-form-label">
            Title
          </label>
          <input
            type="text"
            className="form-control"
            name="title"
            required
            autoComplete="off"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="content" className="col-sm-2 col-form-label">
            Content
          </label>
          <textarea
            className="form-control"
            type="text"
            required
            onChange={(event) => {
              setContent(event.target.value);
            }}
            name="content"
            cols={50}
            rows={10}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Post
        </button>
      </form>
    </div>
  );
}

export default BlogCreationForm;
