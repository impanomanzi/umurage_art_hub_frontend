import { exhibitionKeywords } from "../KeyWords/Keywords";
import { API } from "../../API/serverRequest";
import { Link, Outlet } from "react-router-dom";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import StatusButton from "../StatusButton/StatusButton";
import { useState, useMemo, useEffect } from "react";
import useToast from "../../hooks/useToast";

function ExhibitionsView() {
  const [exhibitions, setExhibitions] = useState([]);
  const [interactedExhibition, setInteractedExhibition] = useState("");
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

  const handleDelete = async (id, name) => {
    try {
      const resp = await API.deleteExhibition(id, name);
      if (resp.success) {
        setToast({ variant: "success", message: "exhibitions deleted" });
        setExhibitions((prevExhibitions) =>
          prevExhibitions.filter((exhibition) => exhibition.id !== id)
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

  const handleActionButtonClicked = async (id, index, callBack) => {
    setInteractedExhibition(String(id) + index);
    await callBack();
    setInteractedExhibition("");
  };

  const generateActions = (id, name, status) => {
    return [
      <StatusButton
        key={`delete-${id}`}
        action={() =>
          handleActionButtonClicked(id, 0, () => handleDelete(id, name))
        }
        isLoading={interactedExhibition === String(id) + 0}
        text={"Delete"}
        variant={"danger"}
      />,
      <StatusButton
        key={`status-${id}`}
        action={() =>
          handleActionButtonClicked(id, 1, () => handleChangeStatus(id, status))
        }
        isLoading={interactedExhibition === String(id) + 1}
        text={"Change Status"}
        variant={"outline-secondary"}
      />,
    ];
  };

  const preprocessedData = useMemo(() => {
    return exhibitions.map((exhibition) => ({
      ...exhibition,
      actions: generateActions(
        exhibition.id,
        exhibition.name,
        exhibition.status
      ),
    }));
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
      <Breadcrumb>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "add_exhibition" }}>
          New
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link} linkProps={{ to: "all" }}>
          All
        </Breadcrumb.Item>
      </Breadcrumb>
      <Outlet context={[listItems]} />
    </>
  );
}

export default ExhibitionsView;
