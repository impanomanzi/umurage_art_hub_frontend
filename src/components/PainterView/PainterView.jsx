import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { painterKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
import LazyImageViewer from "../LazyImageViewer/LazyImageViewer";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
function PainterView() {
  const [painters, setPainters] = useState([]);
  const [interactedPainter, setInteractedPainter] = useState("");
  const [currentPainterId, setCurrentPainterId]= useState(null);
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const getPainters = async () => {
    const resp = await API.getPainters();
    setPainters(resp);
    setIsLoading(false);
  };

  const handleDelete = async () => {
    try {
      const data = await API.deletePainter(currentPainterId);
      if (data.success) {
        setToast({ variant: "success", message: "Painter account deleted" });
        setPainters((prevPainters) =>
          prevPainters.filter((painter) => painter.id !== currentPainterId)
        );
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToast({
        variant: "danger",
        message: "deleting painter account failed",
      });
      console.log(error);
    }
  };
  const handleActionButtonClicked = async (id, index) => {
    setInteractedPainter(String(id) + index);
    setCurrentPainterId(id);
    setInteractedPainter("");
    setShowDeleteConfirm(true);
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
        isLoading={interactedPainter === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
    ];
  };
  const preprocessedData = useMemo(() => {
    return painters.map((painter) => ({
      ...painter,
      id: <span>
      {painter.id}
       <button
         className="btn btn-outline-primary"
         onClick={() => innerCopy(painter.id)}
       >
         <i className="fas fa-copy"></i>
       </button>
   </span>,
      image:  <LazyImageViewer url={painter.image}/>,
      actions: generateActions(painter.id),
    }));
  }, [painters, interactedPainter]);

  const listItems = {
    items: preprocessedData,
    keyword: painterKeywords,
    isLoading: isLoading,
    confirmationRequired: true,
  };
  useEffect(() => {
    getPainters();
  }, []);
  return (
    <>
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "add_painter" }}>
          New
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "all" }}>
          All
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet context={[listItems]} />
      {showDeleteConfirm&&<DeleteConfirmDialog showModal={showDeleteConfirm} onClick={handleDelete} onClose={()=>setShowDeleteConfirm(!showDeleteConfirm)} itemName={"Painter"}/>}
    </>
  );
}

export default PainterView;
