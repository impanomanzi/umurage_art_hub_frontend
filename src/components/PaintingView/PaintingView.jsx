import Viewer from "react-viewer";
import { useEffect, useMemo, useState } from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../../API/serverRequest";
import Spinner from "react-bootstrap/Spinner";
function PaintingView() {
  const [visible, setVisible] = useState(true);
  const [painting, setPainting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const name = useParams().name;
  const id = useParams().id;
  const getPainting = async () => {
    try {
      const resp = await API.getPaintingById(name, id);
      if (resp.success) setPainting(resp.data);
      else {
        throw new Error("");
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
  const imageUrl = useMemo(() => {
    let index1 = painting?.image?.indexOf("upload/") + "upload/".length;
    let newUrl =
      painting?.image?.substring(0, index1) +
      "q_auto:best/" +
      painting?.image?.substring(index1, painting?.image?.length);
    return newUrl;
  }, [painting]);

  useEffect(() => {
    getPainting();
  }, []);
  return (
    <>
      <FormNavbar />

      <div>
        {isLoading && (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        )}
        {!isLoading && painting.image && (
          <>
            <Viewer
              className="image-viewer"
              visible={visible}
              onClose={() => {
                setVisible(false);
                navigate(`/gallery/${name}`);
              }}
              images={[
                {
                  src: imageUrl,
                  alt: "",
                },
              ]}
              noFooter
              noImgDetails
              noNavbar
              noToolbar
            />
            <div style={{ zIndex: 3000, position: "fixed", top: "1%" }}>
              {/* <audio src={paintingInfo.get("a")} controls></audio> */}
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default PaintingView;
