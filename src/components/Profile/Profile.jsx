import { useContext, useState } from "react";
import NavBar from "../NavBar/NavBar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { lazy } from "react";
import Loading from "../loading/loading";
import { Suspense } from "react";
import AuthContext from "../Contexts/AuthContext";
import { PaintingAndExhibitionsContext } from "../Contexts/PaintingAndExhibitionsContext";
function Profile(props) {
  const Dashboard = lazy(() => import("../Dashboard/Dashboard"));
  const ExhibitionCreationForm = lazy(() =>
    import("../Forms/ExhibitionCreationForm/ExhibitionCreationForm")
  );
  const BlogCreationForm = lazy(() =>
    import("../Forms/BlogCreationForm/BlogCreationForm")
  );
  const PasswordChangeForm = lazy(() =>
    import("../Forms/PasswordChangeForm/PasswordChangeForm")
  );

  const PainterCreationForm = lazy(() =>
    import("../Forms/PainterCreationForm/PainterCreationForm")
  );
  const PaintingCreationForm = lazy(() =>
    import("../Forms/PaintingCreationForm/PaintingCreationForm")
  );

  const ExhibitionImagesForm = lazy(() =>
    import("../Forms/ExhibitionImagesForm/ExhibitionImagesForm")
  );
  let loggedIn = useContext(AuthContext);
  const navigate = useNavigate();
  const { exhibitions, paintings } = useContext(PaintingAndExhibitionsContext);
  const [myPaintings, setMyPaintings] = useState(paintings);
  const [myExhibitions, setMyExhibitions] = useState(exhibitions);

  const [currentComponent, setCurrentComponent] = useState("dashboard");
  const [currentList, setCurrentList] = useState("");
  const logout = () => {
    localStorage.removeItem("token");
    sessionStorage.removeItem("token");
    navigate("/sign-in");
  };
  if (!loggedIn) {
    loggedIn = sessionStorage.getItem("token");
  }
  if (loggedIn) {
    return (
      <div className="dashboard-container">
        <div className="profile-container">
          <div>
            <NavBar
              username="Rafiki"
              logout={logout}
              exhibitions={exhibitions}
              paintings={paintings}
              onChangeComponent={setCurrentComponent}
              onChangeList={setCurrentList}
            />
          </div>
          <div className="profile-main">
            {currentComponent === "dashboard" && (
              <Suspense fallback={<Loading />}>
                <Dashboard />
              </Suspense>
            )}
            {currentComponent === "loading" && <Dashboard />}
            {currentComponent === "exhibitionCreationForm" && (
              <Suspense fallback={<Loading />}>
                <ExhibitionCreationForm
                  exhibitions={myExhibitions}
                  addNewExhibition={setMyExhibitions}
                />
              </Suspense>
            )}
            {currentComponent === "blogCreationForm" && (
              <Suspense fallback={<Loading />}>
                <BlogCreationForm />
              </Suspense>
            )}
            {currentComponent === "passwordChangeForm" && (
              <Suspense fallback={<Loading />}>
                <PasswordChangeForm />
              </Suspense>
            )}
            {currentComponent === "paintingCreationForm" && (
              <Suspense fallback={<Loading />}>
                <PaintingCreationForm
                  paintings={paintings}
                  addNewPainting={setMyPaintings}
                />
              </Suspense>
            )}
            {currentComponent === "exhibitionImagesForm" && (
              <Suspense fallback={<Loading />}>
                <ExhibitionImagesForm />
              </Suspense>
            )}
            {currentComponent === "painterCreationForm" && (
              <Suspense fallback={<Loading />}>
                <PainterCreationForm />
              </Suspense>
            )}

            {currentComponent === "list" && (
              <Suspense fallback={<Loading />}>{currentList}</Suspense>
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <span className="lead">You are not signed in yet</span>
        <a href="/sign-in" className="btn btn-primary">
          sign in
        </a>
      </div>
    );
  }
}

export default Profile;
