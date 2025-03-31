import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { paintingKeywords } from "../KeyWords/Keywords";
import usePaintings from "../../hooks/usePaintings";
import StatusButton from "../StatusButton/StatusButton";
import { useMemo } from "react";
import useToast from "../../hooks/useToast";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
import { LazyLoadImage } from "react-lazy-load-image-component";
import settings from "../settings.json";
import LazyImageViewer from "../LazyImageViewer/LazyImageViewer";
function PaintingsView() {
  const { paintings, setPaintings } = usePaintings();
  const [interactedPainting, setInteractedPainting] = useState("");
  const [currentPaintingId, setCurrentPaintingId]= useState(null);
  const { setToast } = useToast();
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const handleDelete = async () => {
    try {
      const data = await API.deletePainting(currentPaintingId);
      if (data.success) {
        setToast({ variant: "success", message: "Painting deleted" });
        setPaintings({
          ...paintings,
          data: paintings.data.filter((painting) => painting.id !== currentPaintingId),
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToast({ variant: "danger", message: "Deleting painting failed" });
    }
  };
  const handleActionButtonClicked = async (id, index) => {
    setInteractedPainting(String(id) + index);
    setCurrentPaintingId(id);
    setShowDeleteConfirm(true);
    setInteractedPainting("");
  };


  const innerCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ variant: "success", message: "Text copied" });
  };

  const generateActions = (id) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() => handleActionButtonClicked(id, 0)}
        isLoading={interactedPainting == String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
    ];
  };
  const preprocessedData = useMemo(() => {
    return paintings.data.map((painting) => {
      return { ...painting, actions: generateActions(painting.id), 
        id: <span>
           {painting.id}
            <button
              className="btn btn-outline-primary"
              onClick={() => innerCopy(painting.id)}
            >
              <i className="fas fa-copy"></i>
            </button>
        </span>,
        profile: <LazyLoadImage
        src={`${painting.profile}`.replace(
          "http://localhost:5000",
          `${settings.server_domain}`
        )}
        effect="blur"
        placeholderSrc="/placeholder.png"
        width={"50px"}
        height="50px"
        style={{ borderRadius: "50%" }}
      />, 
    image: <LazyImageViewer url={painting.image}/>
   };
    });
  }, [paintings, interactedPainting]);

  const listItems = {
    items: preprocessedData,
    keyword: paintingKeywords,
    confirmationRequired: true,
  };

  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "add_painting" }}>
          New
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "all" }}>
          All
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet context={[listItems]} />

      {showDeleteConfirm&&<DeleteConfirmDialog showModal={showDeleteConfirm} onClick={handleDelete} onClose={()=>setShowDeleteConfirm(!showDeleteConfirm)} itemName={"Painting"}/>}
    </>
  );
}

export default PaintingsView;
