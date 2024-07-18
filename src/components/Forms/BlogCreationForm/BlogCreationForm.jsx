import "../FormTemplate/FormTemplate.css";
import settings from "../../settings.json";
import { loading, unload } from "../../ButtonEffects/ButtonEffects";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-hot-toast";
import CustomLoadingButton from "../../FormButton/FormButton";
function BlogCreationForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      let userId;
      try {
        userId = jwtDecode(localStorage.getItem("token")).user;
      } catch (error) {
        throw new Error("Your session expired");
      }
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("created", new Date().toLocaleString());
      formData.append("author", userId);
      const response = await fetch(
        `${settings.server_domain}/blog/add_new_blog`,
        {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        toast.success("Blog submitted successfully");
      } else {
        throw new Error("Blog Failed to be submitted ");
      }
    } catch (error) {
      toast.error(String(error));
    } finally {
      setIsLoading(false);
    }
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
        <CustomLoadingButton
          isLoading={isLoading}
          onClick={null}
          text="post"
          buttonType="submit"
        />
      </form>
    </div>
  );
}

export default BlogCreationForm;
