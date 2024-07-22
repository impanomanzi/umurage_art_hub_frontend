import { useEffect, useRef, useState } from "react";
import "../FormTemplate/FormTemplate.css";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { validateFileType } from "../../../FileValidation/FileValidation";
import { API } from "../../../API/serverRequest";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";

function PainterCreationForm(props) {
  const { setToast } = useToast();
  const [showImagePreview, setShowImagePreview] = useState(false);
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const [fileError, setFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const formRef = useRef();

  const handleOnChange = (value) => {
    setPhoneNumber(value);
  };

  const handleRequest = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("password", password);
      formData.append("phonenumber", phoneNumber);
      formData.append("profilepicture", profilePicture);
      formData.append("email", email);
      const resp = await API.addPainter(formData);
      if (resp.success) {
        formRef.current.reset();
        setToast({ variant: "success", message: "Painter account created" });
      } else {
        setToast({
          variant: "danger",
          message: resp.message,
        });
      }
    } catch (error) {
      setToast({
        variant: "danger",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOnSubmit = (event) => {
    event.preventDefault();
    handleRequest("add_new_painter");
  };

  return (
    <div className="payment-registration-form-container m-3">
      <h2>CREATE NEW PAINTER ACCOUNT</h2>
      <form onSubmit={handleOnSubmit} className="painter-form" ref={formRef}>
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            FULL NAME
          </label>
          <input
            type="text"
            className="form-control"
            required
            name="fullname"
            onChange={(event) => {
              setFullname(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username" className="col-sm-2 col-form-label">
            USERNAME
          </label>
          <input
            type="text"
            name="username"
            className="form-control"
            autoComplete="off"
            required
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="phonenumber" className="col-sm-2 col-form-label">
            PHONE NUMBER
          </label>
          <PhoneInput
            country={"rw"}
            value={phoneNumber}
            onChange={handleOnChange}
            inputProps={{ required: true }}
            className="form-control"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email" className="col-sm-2 col-form-label">
            EMAIL
          </label>
          <input
            type="email"
            required
            autoComplete="off"
            className="form-control"
            name="email"
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password" className="col-sm-2 col-form-label">
            PASSWORD
          </label>
          <input
            type="password"
            required
            autoComplete="off"
            className="form-control"
            name="password"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
        </div>
        {props.data ? null : (
          <div className="form-group">
            <label htmlFor="profile" className="col-sm-2 col-form-label">
              PROFILE PICTURE
            </label>

            <input
              required
              type="file"
              name="profilepicture"
              className="form-control-file"
              accept=".jpg, .png, .jpeg"
              onChange={(event) => {
                validateFileType(
                  event,
                  acceptedFileTypes,
                  setProfilePicture,
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
              <div className="profile-preview">
                <center>
                  <img
                    src={URL.createObjectURL(profilePicture)}
                    width="135px"
                    height="135px"
                    style={{ borderRadius: "67.5px" }}
                  />
                </center>
              </div>
            )}
          </div>
        )}

        <CustomLoadingButton
          isLoading={isLoading}
          onClick={null}
          text="Add painter"
          buttonType="submit"
        />
      </form>
    </div>
  );
}

export default PainterCreationForm;
