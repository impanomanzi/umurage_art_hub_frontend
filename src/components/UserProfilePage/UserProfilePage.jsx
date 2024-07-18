import { useState, useEffect, useContext } from "react";
import { paintingKeywords } from "../KeyWords/Keywords";
import ProfileTopNav from "../ProfileTopNav/ProfileTopNav";
import ProfileBottomNav from "../ProfileBottomNav/ProfileBottomNav";
import ListView from "../ListView/ListView";
import "./UserProfilePage.css";
import ProfilePage from "../ProfilePage/ProfilePage";
import PaintingCreationForm from "../Forms/PaintingCreationForm/PaintingCreationForm";
import PasswordChangeForm from "../Forms/PasswordChangeForm/PasswordChangeForm";
import { API } from "../../API/serverRequest";
import Loading from "../loading/loading";
import { Suspense } from "react";
import toast from "react-hot-toast";
import AuthContext from "../Contexts/AuthContext";
import { PaintingAndExhibitionsContext } from "../Contexts/PaintingAndExhibitionsContext";
function UserProfilePage(props) {
  let loggedIn = useContext(AuthContext);
  const { exhibition, painting } = useContext(PaintingAndExhibitionsContext);
  const [paintings, setPaintings] = useState([]);
  let myPaintings = paintings;
  const getLoggedUserPaintintings = async () => {
    try {
      const data = await API.getUserPaintings();
      if (data.success) {
        setPaintings(data.data);
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      toast.error(String(error));
    }
  };

  const options = [
    {
      text: "Delete",
      callBack: async (params) => {
        try {
          const data = await API.deletePainting(params);
          if (data.success) {
            params.delete();
          } else {
            throw new Error(data.message);
          }
        } catch (error) {
          toast.error(String(error));
        }
      },
      icon: "fas fa-trash",
    },
  ];

  const load = async () => {
    await getLoggedUserPaintintings();
    setCurrentComponet("list");
    setCurrentList(
      <ListView
        items={paintings}
        title="Your paintings"
        keyword={["name", "category", "id"]}
        options={options}
        confirmationRequired={true}
      />
    );
  };
  const [currentComponent, setCurrentComponet] = useState("profile");
  const [currentList, setCurrentList] = useState();
  useEffect(() => {
    getLoggedUserPaintintings();
  }, []);
  if (!loggedIn) {
    loggedIn = sessionStorage.getItem("token");
  }
  if (loggedIn) {
    return (
      <div className="home-main-container">
        <ProfileTopNav
          paintings={paintings}
          exhibitions={exhibition}
          onChangeComponent={setCurrentComponet}
          onChangeList={setCurrentList}
        />

        <div className="user user-main">
          {currentComponent == "defaultList" && (
            <Suspense fallback={<Loading />}>
              <ListView
                items={paintings}
                title="Your paintings"
                keyword={["name", "category", "id"]}
                options={options}
                confirmationRequired={true}
              />
            </Suspense>
          )}
          {currentComponent == "list" && (
            <Suspense fallback={<Loading />}>{currentList}</Suspense>
          )}
          {currentComponent === "profile" && (
            <ProfilePage onChangeComponent={setCurrentComponet} />
          )}
          {currentComponent === "paintingCreationForm" && (
            <PaintingCreationForm
              paintings={myPaintings}
              addNewPainting={setPaintings}
            />
          )}
          {currentComponent === "password" && <PasswordChangeForm />}
        </div>
        <ProfileBottomNav
          home={load}
          paintings={paintings}
          exhibitions={exhibition}
          onChangeComponent={setCurrentComponet}
          onChangeList={setCurrentList}
        />
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

export default UserProfilePage;
