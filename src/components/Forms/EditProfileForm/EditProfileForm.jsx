import CustomLoadingButton from "../../FormButton/FormButton";
import Modal from "react-bootstrap/Modal";
import { TextareaAutosize } from "@mui/material";
import { useState ,useRef,useEffect } from "react";
import { API } from "../../../API/serverRequest";
import useToast from "../../../hooks/useToast";
import useUser from "../../../hooks/useUser";
import { LazyLoadImage } from "react-lazy-load-image-component";
function EditProfileForm({show,onclose}) {
    const [profile, setProfile]= useState( {
        username: "",
        phone: "",
        picture: "",
        email: "",
        bio: "",
        facebook: "",
        instagram: "",
        x: "",
        tiktok: "",
        youtube: "",
        fullname:""
    })
  const [imagePreviewLink, setImagePreviewLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [fileError, setFileError] = useState(false);
  const FILE_ERROR = "the file you selected is not supported.";
  const { setToast } = useToast();
  const formRef = useRef();
  const user= useUser()

  const getProfile = async () => {
    try {
      const resp = await API.getProfile(user.user);
      if (resp.success) {
        setProfile({...resp.data});
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };
 

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("fullname", profile.fullname);
      formData.append("username", profile.username);
      formData.append("phonenumber", profile.phone);
      formData.append("profilepicture", profile.profilePicture);
      formData.append("instagram", profile.instagram);
      formData.append("facebook", profile.facebook);
      formData.append("x", profile.x);
      formData.append("tiktok", profile.tiktok);
      formData.append("youtube", profile.youtube);
      formData.append("bio", profile.bio);
      const resp = await API.updatePainter(formData);
      if (resp.success) {
        onclose()
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

  useEffect(()=>{
    getProfile()
  },[])

  useEffect(() => {
    if (profile.picture.name) {
      setImagePreviewLink(URL.createObjectURL(profile.picture));
    }
  }, [profile.picture]);
  return (
    <Modal
            show={true}
            onHide={onclose}
            dialogClassName="modal-dialog"
          >
            <Modal.Header closeButton>
              <Modal.Title>Edit profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
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
                  <div className="form-group">
                    <input
                      type="file"
                      className="btn btn-outline-dark"
                      accept=".jpg, .png, .jpeg"
                      onChange={(event) => {
                        setProfile({...profile, picture:event.target.files[0]})
                      }}
                    />
                  </div>
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
                    defaultValue={profile.fullname}
                    className="form-control"
                    onChange={(event) => {
                        setProfile({...profile, fullname:event.target.value})
                    }}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    required
                    defaultValue={profile.username}
                    onChange={(event) => {
                        setProfile({...profile, username:event.target.value})
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    required
                    defaultValue={profile.phone}
                    onChange={(event) => {
                        setProfile({...profile, phone:event.target.value})
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-1">
                  <label htmlFor="instagram">Bio</label>
                  <TextareaAutosize
                  defaultValue={profile.bio}
                    onChange={(event) => {
                        setProfile({...profile, bio:event.target.value})
                    }}
                    className="form-control"
                  />
                </div>
                <div className="form-group mt-1">
                  <div className="input-group">
                    <label htmlFor="instagram" className="input-group-text">
                      <i class="fa-brands fa-instagram"></i>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.instagram}
                      onChange={(event) => {
                        setProfile({...profile, instagram:event.target.value})
                      }}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="form-group mt-1">
                  <div className="input-group">
                    <label htmlFor="facebook" className="input-group-text">
                      <i class="fa-brands fa-facebook"></i>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.facebook}
                      onChange={(event) => {
                        setProfile({...profile, facebook:event.target.value})
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mt-1">
                  <div className="input-group">
                    <label htmlFor="x" className="input-group-text">
                      <i class="fa-brands fa-x-twitter"></i>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.x}
                      onChange={(event) => {
                        setProfile({...profile, x:event.target.value})
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mt-1">
                  <div className="input-group">
                    <label htmlFor="tiktok" className="input-group-text">
                      <i class="fa-brands fa-tiktok"></i>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.tiktok}
                      onChange={(event) => {
                        setProfile({...profile, tiktok:event.target.value})
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group mt-1">
                  <div className="input-group">
                    <label htmlFor="youtube" className="input-group-text">
                      <i class="fa-brands fa-youtube"></i>
                    </label>
                    <input
                      type="text"
                      defaultValue={profile.youtube}
                      onChange={(event) => {
                        setProfile({...profile, youtube:event.target.value})
                      }}
                      className="form-control"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <CustomLoadingButton
                    isLoading={isLoading}
                    onClick={null}
                    text="Save changes"
                    buttonType="submit"
                  />
                </div>
              </form>
            </Modal.Body>
          </Modal>
  )
}

export default EditProfileForm