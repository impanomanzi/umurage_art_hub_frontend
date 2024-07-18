import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import "../FormTemplate/FormTemplate.css";
import { toast } from "react-hot-toast";
import { API } from "../../../API/serverRequest";
import CustomLoadingButton from "../../FormButton/FormButton";
import { validateFileType } from "../../../FileValidation/FileValidation";
function PaintingCreationForm(props) {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Potrait");
  const [painting, setPainting] = useState("");
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [imagePreviewLink, setImagePreviewLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const [fileError, setFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const formData = new FormData();
  let owner;
  try {
    owner = jwtDecode(localStorage.getItem("token")).id;
  } catch (error) {
    toast.error("your session expired");
  }
  formData.append("name", name);
  formData.append("category", category);
  formData.append("painting", painting);
  formData.append("owner", owner);
  formData.append("created", new Date().toLocaleString());
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = await API.addPainting(formData);
      if (data.success) {
        toast.success("Painting added succesfully");

        if (props.paintings.data) {
          let inner = props.paintings.data;
          let newItem = {
            category: category,
            created: new Date().toLocaleString(),
            id: data.data[0].id,
            image: data.data[0].image,
            name: name,
            owner: jwtDecode(localStorage.getItem("token")).user,
            likes: data.data[0].likes,
          };
          inner.push(newItem);
          props.addNewPainting(inner);
        }
        document.querySelector(".painting-form").reset();
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
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

      <form onSubmit={handleOnSubmit} className="painting-form">
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
