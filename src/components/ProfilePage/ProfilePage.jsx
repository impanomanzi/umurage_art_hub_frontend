import "./ProfilePage.css";
import { useState , useEffect} from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import useUser from "../../hooks/useUser";
import EditProfileForm from "../Forms/EditProfileForm/EditProfileForm";
import { API } from "../../API/serverRequest";
import useToast from "../../hooks/useToast";
function ProfilePage(props) {
  const user = useUser();
  const [viewEditProfile, setViewEditProfile] = useState(false);
  const { setToast } = useToast();
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

  useEffect(()=>{
    getProfile()
  },[viewEditProfile])


  return (
    <>
      <div className="profile-page-container">
        <div className="profilepage-container">
          <div className="profilepage-header">
            <h4>YOUR PROFILE</h4>
          </div>
          <div className="profilepage-image-container">
            <LazyLoadImage
              src={profile.picture}
              effect="blur"
              placeholderSrc="/placeholder.png"
              width={"100px"}
              height={"100px"}
            />
          </div>
          <div className="profilepage-details-container">
            <span className="btn btn-dark">painter</span>
            <span className="fullname">{profile.fullname}</span>
            <span className="username">&#64;{profile.username}</span>
            <span className="email">{profile.email}</span>
            <span className="role">{user.role}</span>
            <span className="role">{profile.phone}</span>
          </div>
          <button
            className="btn btn-outline-primary"
            onClick={() => setViewEditProfile(!viewEditProfile)}
          >
            <i className="fas fa-pen"></i>&nbsp;Edit profile
          </button>
        </div>
        {viewEditProfile && <EditProfileForm show={viewEditProfile} onclose={()=>setViewEditProfile(false)}/>}
      </div>
    </>
  );
}

export default ProfilePage;
