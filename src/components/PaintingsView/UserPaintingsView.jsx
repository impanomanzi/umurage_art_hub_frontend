import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { paintingKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import { useMemo } from "react";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
import LazyImageViewer from "../LazyImageViewer/LazyImageViewer";
function UserPaintingsView() {
  const [paintings, setPaintings] = useState([]);
  const [interactedPainting, setInteractedPainting] = useState("");
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [currentPaintingId, setCurrentPaintingId]= useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const user = useUser();
  const getPaintings = async () => {
    const formData = new FormData();
    formData.append("userId", user.id);
    const resp = await API.getUserPaintings(formData);
    if (resp.success) {
      setPaintings(resp.data);
    }
    setIsLoading(false);
  };
  const handleDelete = async () => {
    try {
      const resp = await API.deletePainting(currentPaintingId);
      if (resp.success) {
        setToast({ variant: "success", message: "Painting deleted" });
        setPaintings(resp.data);
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
    return paintings.map((painting) => {
      return { ...painting, actions: generateActions(painting.id) ,  
        id: <span>
        {painting.id}
         <button
           className="btn btn-outline-primary"
           onClick={() => innerCopy(painting.id)}
         >
           <i className="fas fa-copy"></i>
         </button>
     </span>, 
       image:  <LazyImageViewer url={painting.image}/>};
    });
  }, [paintings, interactedPainting]);

  const listItems = {
    items: preprocessedData,
    keyword: paintingKeywords,
    confirmationRequired: true,
    isLoading: isLoading,
  };

  useEffect(() => {
    getPaintings();
  }, []);
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

export default UserPaintingsView;
