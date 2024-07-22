import { useEffect, useState, useRef } from "react";
import "../FormTemplate/FormTemplate.css";
import { API } from "../../../API/serverRequest";
import CustomLoadingButton from "../../FormButton/FormButton";
import { validateFileType } from "../../../FileValidation/FileValidation";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
function PaintingCreationForm(props) {
  const { setToast } = useToast();
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Potrait");
  const [painting, setPainting] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imagePreviewLink, setImagePreviewLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const [fileError, setFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const formRef = useRef();
  const owner = useUser().id;

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("category", category);
      formData.append("painting", painting);
      formData.append("owner", owner);
      formData.append("created", new Date().toLocaleString());
      const resp = await API.addPainting(formData);
      if (resp.success) {
        setToast({ variant: "success", message: "Painting uploaded" });
        formRef.current.reset();
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    if (painting.name) {
      setShowImagePreview(true);
      setImagePreviewLink(URL.createObjectURL(painting));
    }
  }, [painting]);
  return (
    <div className="payment-registration-form-container m-3">
      <h2>ADD NEW PAINTING</h2>
      <form onSubmit={handleOnSubmit} className="painting-form" ref={formRef}>
        <div className="form-group">
          <label htmlFor="name" className="col-sm-2 col-form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            name="name"
            required
            autoComplete="off"
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="category" className="col-sm-2 col-form-label">
            Category
          </label>
          <select
            className="form-control"
            name="category"
            required
            onChange={(event) => {
              setCategory(event.target.value);
            }}
            defaultValue={"Potrait"}
          >
            <option value="Potrait">Potrait</option>
            <option value="Art work">Art Work</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="painting" className="col-sm-2 col-form-label">
            Painting
          </label>

          <input
            name="painiting"
            required
            className="form-control-file"
            type="file"
            accept=".jpg, .png, .jpeg"
            onChange={(event) => {
              validateFileType(
                event,
                acceptedFileTypes,
                setPainting,
                setShowImagePreview,
                setFileError
              );
            }}
          />
          {fileError && (
            <div className="alert alert-danger">
              {FILE_ERROR} <br />
              Supported files are .png, .jpg, .jpeg
            </div>
          )}
          {showImagePreview && (
            <div className="painting-preview">
              <center>
                <img
                  src={imagePreviewLink}
                  width="135px"
                  style={{ borderRadius: "10px" }}
                />
              </center>
            </div>
          )}
        </div>
        <CustomLoadingButton
          isLoading={isLoading}
          onClick={null}
          text="Add"
          buttonType="submit"
        />
      </form>
    </div>
  );
}

export default PaintingCreationForm;
