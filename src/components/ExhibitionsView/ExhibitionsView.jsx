import { exhibitionKeywords } from "../KeyWords/Keywords";
import { API } from "../../API/serverRequest";
import { Link, Outlet } from "react-router-dom";
import Stack from "react-bootstrap/Stack"
import StatusButton from "../StatusButton/StatusButton";
import { useState, useMemo, useEffect } from "react";
import useToast from "../../hooks/useToast";
import EditButton from "../EditButton/EditButton";
import EditExhibitionForm from "../Forms/ExhibitionCreationForm/EditExhibitionForm";
import CurrencyView from "../CurrencyView/CurrencyView";
import DeleteConfirmDialog from "../Dialogs/DeleteConfirmDialog/DeleteConfirmDialog";
import StatusView from "../StatusView/StatusView";
import ReactMarkdown from "react-markdown";
import LazyImageViewer from "../LazyImageViewer/LazyImageViewer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTable } from "@fortawesome/free-solid-svg-icons";

function ExhibitionsView() {
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentExhibitionData, setCurrentExhibitionData] = useState({});
  const [exhibitions, setExhibitions] = useState([]);
  const [interactedExhibition, setInteractedExhibition] = useState("");
  const [currentExhibition, setCurrentExhibition]= useState({
    id:"",name:""
  });
  const[showDeleteConfirm, setShowDeleteConfirm]= useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();

  const getAllExhibitions = async () => {
    try {
      const resp = await API.getAllExhibitions();
      setExhibitions(resp.data);
    } catch (error) {
      setToast({
        variant: "danger",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    try {
      const resp = await API.deleteExhibition(currentExhibition.id, currentExhibition.name);
      if (resp.success) {
        setToast({ variant: "success", message: "exhibitions deleted" });
        setExhibitions((prevExhibitions) =>
          prevExhibitions.filter((exhibition) => exhibition.id !== currentExhibition.id)
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

  const handleChangeStatus = async (id, status) => {
    try {
      const resp = await API.changeExhibitionStatus(id, status);
      if (resp.success) {
        setExhibitions((prevExhibitions) =>
          prevExhibitions.map((exhibition) =>
            exhibition.id === id
              ? { ...exhibition, status: resp.data.status }
              : exhibition
          )
        );
        setToast({ variant: "success", message: "Exhibition status changed" });
      } else {
        setToast({
          variant: "danger",
          message: resp.message,
        });
      }
    } catch (error) {
      setToast({
        variant: "danger",
        message: error.message,
      });
    }
  };

  const handleEditExhibtion = async (exhibitionId, formData) => {
    const resp = await API.updateExhibition(exhibitionId, formData);
    if (resp.success) {
      setExhibitions((prevExhibitions) =>
        prevExhibitions.map((exhibition) =>
          exhibition.id === exhibitionId ? { ...resp.data } : exhibition
        )
      );
      setToast({ variant: "success", message: "Exhibition updated" });
    } else {
      setToast({ variant: "danger", message: resp.message });
    }
  };
  const showEditExhbitionForm = (data) => {
    setShowEditForm(!showEditForm);
    setCurrentExhibitionData(data);
  };

  const handleActionButtonClicked = async (id, index, callBack) => {
    setInteractedExhibition(String(id) + index);
    await callBack();
    setInteractedExhibition("");
  };

  const innerCopy = (text) => {
    navigator.clipboard.writeText(text);
    setToast({ variant: "success", message: "Text copied" });
  };

  const generateActions = (id, name, status, data) => {
    return [
      <StatusButton
        key={`status-${id}`}
        action={() =>
          handleActionButtonClicked(id, 1, () => handleChangeStatus(id, status))
        }
        isLoading={interactedExhibition === String(id) + 1}
        text={"Change Status"}
        variant={"primary"}
      />,
      <EditButton
        action={() => showEditExhbitionForm(data)}
        variant={"outline-primary"}
      />,

      <StatusButton
        key={`delete-${id}`}
        action={() =>
          handleActionButtonClicked(id, 0, () => {
            setCurrentExhibition({
              ...currentExhibition, id:id, name:name
            })
            setShowDeleteConfirm(true);
          })
        }
        isLoading={interactedExhibition === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
    ];
  };

 

  const preprocessedData = useMemo(() => {
    return exhibitions.map((exhibition) => {
      console.log(exhibition.description)
      return {
        ...exhibition, id: <span>
        {exhibition.id}
         <button
           className="btn btn-outline-primary"
           onClick={() => innerCopy(exhibition.id)}
         >
           <i className="fas fa-copy"></i>
         </button>
     </span>,
        fees: <CurrencyView number={exhibition.fees[0]} />,
        image:  <LazyImageViewer url={exhibition.image}/>,

        actions: generateActions(
          exhibition.id,
          exhibition.name,
          exhibition.status,
          exhibition
        ),
        status:<StatusView status={exhibition.status} isLoading={false}/>,
        description:<ReactMarkdown>{exhibition.description}</ReactMarkdown>
      };
    });
  }, [exhibitions, interactedExhibition]);

  const listItems = {
    items: preprocessedData,
    keyword: exhibitionKeywords,
    isLoading,
    confirmationRequired: true,
  };

  useEffect(() => {
    getAllExhibitions();
  }, []);

  return (
    <>


    <Stack gap={3} className="stack-toolbar">
      <Link  to={"add_exhibition"}><FontAwesomeIcon icon={faPlus} /></Link>
      <Link  to={"all"}><FontAwesomeIcon icon={faTable} /></Link>
     
    </Stack>
       
      <Outlet context={[listItems, "exhibition"]} />
      <EditExhibitionForm
        exhibitionData={currentExhibitionData}
        onHide={() => setShowEditForm(!showEditForm)}
        show={showEditForm}
        onSubmit={handleEditExhibtion}
      />
       {showDeleteConfirm&&<DeleteConfirmDialog showModal={showDeleteConfirm} onClick={handleDelete} onClose={()=>setShowDeleteConfirm(!showDeleteConfirm)} itemName={"Exhibition"}/>}
    </>
  );
}

export default ExhibitionsView;
