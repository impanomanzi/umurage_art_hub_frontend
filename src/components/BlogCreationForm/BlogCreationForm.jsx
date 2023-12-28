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
    <div className="payment-registration-form-container">
      <h2>Create new Blog</h2>
      <hr />

      <form onSubmit={handleOnSubmit}>
        <div className="form-inputs-container">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            autoComplete="off"
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
        </div>
        <div className="form-inputs-container">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            onChange={(event) => {
              setContent(event.target.value);
            }}
            name="content"
            cols={50}
            rows={10}
          />
        </div>
        <button type="submit">Post</button>
      </form>
    </div>
  );
}

export default BlogCreationForm;
