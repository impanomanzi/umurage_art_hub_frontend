import "./ProfileBottomNav.css";

function ProfileBottomNav(props) {
  function timeout(delay) {
    return new Promise((res) => setTimeout(res, delay));
  }
  const renderProfilePage = () => {
    props.onChangeComponent("profile");
  };
  const renderPaintingCreationForm = () => {
    props.onChangeComponent("paintingCreationForm");
  };

  return (
    <div className="profile-bottom-nav-container">
      <div className="home-area">
        <button
          className="btn btn-primary"
          onClick={async () => {
            props.onChangeComponent("profile");
            await timeout(3);
            props.home();
          }}
        >
          <i className="fas fa-home"></i>
        </button>
      </div>
      <div className="add-area">
        <button
          className="btn btn-primary"
          onClick={renderPaintingCreationForm}
        >
          <i className="fas fa-plus"></i>
        </button>
      </div>
      <div className="contact-area">
        <button className="btn btn-primary" onClick={renderProfilePage}>
          <i className="fas fa-user-circle"></i>
        </button>
      </div>
    </div>
  );
}

export default ProfileBottomNav;
