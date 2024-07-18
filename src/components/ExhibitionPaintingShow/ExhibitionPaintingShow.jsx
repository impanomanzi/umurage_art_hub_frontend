import { useLocation, useNavigate } from "react-router-dom";
import "./ExhibitionPaintingShow.css";
import { useState } from "react";
import FormNavbar from "../NavBar/FormNavbar";
import Viewer from "react-viewer";

function ExhibitionPaintingShow(props) {
  const paintingInfo = new URLSearchParams(useLocation().search);
  const handleOnClose = () => {
    navigate(`/exhibition_paintings/${paintingInfo.get("eid")}`);
  };
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  return (
    <>
      <FormNavbar />
      <div>
        <Viewer
          visible={visible}
          onClose={() => {
            setVisible(false);
            handleOnClose();
          }}
          className="painting-show"
          images={[
            {
              src: paintingInfo.get("i"),
              alt: "",
            },
          ]}
        />
      </div>
    </>
  );
}

export default ExhibitionPaintingShow;
