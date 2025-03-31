import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
import LazyImageViewer from "../LazyImageViewer/LazyImageViewer";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";

function ExhibitionsPaintingsView() {
  const [exhibitionPaintings, setExhibitionPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [currentPaintingId, setCurrentPaintingId]= useState(null);
  const [interactedExhibiton, setInteractedExhibition] = useState("");
  const { setToast } = useToast();
  const getExhibitionsPaintings = async () => {
    try {
      const resp = await API.getAllExhibitionPaintings();
      setExhibitionPaintings(resp.data);
    } catch (error) {
      setToast({
        variant: "success",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleDelete = async () => {
    try {
      const resp = await API.deleteExhibitionPainting(currentPaintingId);
      if (resp) {
        setToast({
          variant: "success",
          message: "Painting deleted",
        });
        setExhibitionPaintings((exhibitionPaintings) =>
          exhibitionPaintings.filter((painting) => painting.id !== currentPaintingId)
        );
      } else {
        setToast({
          variant: "danger",
          message: resp.message,
        });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    }
  };

  const handleActionButtonClicked = async (id, index) => {
    setInteractedExhibition(String(id) + index);
    setCurrentPaintingId(id);
    setShowDeleteConfirm(true);
    setInteractedExhibition("");
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
        isLoading={interactedExhibiton == String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
    ];
  };

  const preprocessedData = useMemo(() => {
    return exhibitionPaintings?.map((painting) => {
      return { ...painting,
         actions: generateActions(painting.id), 
         id: <span>
         {painting.id}
          <button
            className="btn btn-outline-primary"
            onClick={() => innerCopy(painting.id)}
          >
            <i className="fas fa-copy"></i>
          </button>
      </span>,
         audio:<audio src={painting.audio} controls></audio>,
         image:   <LazyImageViewer url={painting.image}/>

        };
    });
  }, [exhibitionPaintings, interactedExhibiton]);

  const listItems = {
    items: preprocessedData,
    keyword: ["name", "description"],
    isLoading: isLoading,
    confirmationRequired: true,
  };
  useEffect(() => {
    getExhibitionsPaintings();
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: "add_exhibition_paintings" }}
        >
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

export default ExhibitionsPaintingsView;
