import "./HomePainterCard.css"
import { Link } from "react-router-dom"
function HomePainterCard({profileData}) {
    
  return<div className="profile-card">
  <div className="profile-img">
    <img src={profileData.picture} alt={profileData.username} />
  </div>
  <div className="profile-info">
    <Link to={`gallery/${profileData.username}`}>
    <b className="profile-title">{profileData.username}</b>
    </Link>
    <div className="social-links">
  
    {profileData.facebook&&<a href={profileData.facebook}><i className="fab fa-facebook"></i></a>}
    {profileData.instagram&&<a href={profileData.instagram}><i className="fab fa-instagram"></i></a>}
    {profileData.tiktok&&<a href={profileData.tiktok}><i className="fab fa-tiktok"></i></a>}
    {profileData.x&&<a href={profileData.x}><i className="fab fa-x-twitter"></i></a>}
    {profileData.email&&<a href={`mailto:${profileData.email}`}><i className="fa-solid fa-envelope"></i></a>}
    {profileData.phone&&<a href={`tel:${profileData.phone}`}><i className="fa-solid fa-phone"></i></a>}
    </div>
  </div>
</div>
}

export default HomePainterCard