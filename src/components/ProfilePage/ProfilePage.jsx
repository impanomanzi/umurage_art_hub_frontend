import "./ProfilePage.css";
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import CustomLoadingButton from "../FormButton/FormButton";
import { validateFileType } from "../../FileValidation/FileValidation";
import { API } from "../../API/serverRequest";
import useUser from "../../hooks/useUser";
import useToast from "../../hooks/useToast";
function ProfilePage(props) {
  const user = useUser();
  const [username, setUsername] = useState(user.user);
  const [profilePicture, setProfilePicture] = useState(user.picture);
  const [fullname, setFullname] = useState(user.fullname);
  const [phone, setPhone] = useState(user.phone);
  const [viewEditProfile, setViewEditProfile] = useState(false);
  const [imagePreviewLink, setImagePreviewLink] = useState(user.picture);
  const [isLoading, setIsLoading] = useState(false);
  const [imageValidated, setImageValidated] = useState(false);
  const acceptedFileTypes = ["image/jpeg", "image/jpg", "image/png"];
  const [fileError, setFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const { setToast } = useToast();
  const formRef = useRef();
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullname", fullname);
      formData.append("username", username);
      formData.append("phonenumber", phone);
      formData.append("profilepicture", profilePicture);
      const resp = await API.updatePainter(formData);
      if (resp.success) {
        formRef.current.reset();
        setToast({ variant: "success", message: "Information updated" });
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
    if (profilePicture.name) {
      setImagePreviewLink(URL.createObjectURL(profilePicture));
    }
  }, [profilePicture]);
  return (
    <>
      <div className="profile-page-container">
        <div className="profilepage-container">
          <div className="profilepage-header">
            <h4>YOUR PROFILE</h4>
          </div>
          <div className="profilepage-image-container">
            <LazyLoadImage
              src={user.picture}
              effect="blur"
              placeholderSrc="/placeholder.png"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <div className="profilepage-details-container">
            <span className="btn btn-dark">painter</span>
            <span className="fullname">{user.fullname}</span>
            <span className="username">&#64;{user.user}</span>
            <span className="email">{user.email}</span>
            <span className="role">{user.role}</span>
            <span className="role">{user.phone}</span>
          </div>
          <button
            className="btn btn-outline-primary"
            onClick={() => setViewEditProfile(true)}
          >
            <i className="fas fa-pen"></i>&nbsp;Edit profile
          </button>
        </div>
        {viewEditProfile && (
          <div className="edit-profile-outer-container">
            <div className="close-btn-container">
              <button
                className="btn btn-close"
                onClick={() => setViewEditProfile(false)}
              ></button>
            </div>
            <div className="edit-profile-page-container">
              <form
                onSubmit={handleOnSubmit}
                className="update-form"
                ref={formRef}
              >
                <div className="form-group">
                  <div
                    className="profilepage-image-container"
                    style={{ marginBottom: "1em" }}
                  >
                    <LazyLoadImage
                      src={imagePreviewLink}
                      effect="blur"
                      placeholderSrc="/placeholder.png"
                      width={"100px"}
                      height={"100px"}
                    />
                  </div>
                  <input
                    type="file"
                    className="btn btn-outline-dark"
                    accept=".jpg, .png, .jpeg"
                    onChange={(event) => {
                      validateFileType(
                        event,
                        acceptedFileTypes,
                        setProfilePicture,
                        setImageValidated,
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
                </div>
                <div className="form-group">
                  <label htmlFor="fullname">Full Name</label>
                  <input
                    type="text"
                    required
                    defaultValue={fullname}
                    className="form-control"
                    onChange={(event) => {
                      setFullname(event.target.value);
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    required
                    defaultValue={username}
                    onChange={(event) => {
                      setUsername(event.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    required
                    defaultValue={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <CustomLoadingButton
                    isLoading={isLoading}
                    onClick={null}
                    text="Save"
                    buttonType="submit"
                  />
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfilePage;
