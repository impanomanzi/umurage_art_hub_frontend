import "../FormTemplate/FormTemplate.css";
import { useState } from "react";
import CustomLoadingButton from "../../FormButton/FormButton";
import useUser from "../../../hooks/useUser";
import useToast from "../../../hooks/useToast";
import { API } from "../../../API/serverRequest";
function BlogCreationForm() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setToast } = useToast();
  const user = useUser();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("created", new Date().toLocaleString());
      formData.append("author", user.user);
      const resp = await API.addBlog(formData);
      if (resp.success) {
        setToast({ variant: "success", message: "Blog posted" });
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
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
