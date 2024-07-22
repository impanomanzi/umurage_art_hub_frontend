import { useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { paintingKeywords } from "../KeyWords/Keywords";
import usePaintings from "../../hooks/usePaintings";
import StatusButton from "../StatusButton/StatusButton";
import { useMemo } from "react";
import useToast from "../../hooks/useToast";
function PaintingsView() {
  const { paintings, setPaintings } = usePaintings();
  const [interactedPainting, setInteractedPainting] = useState("");
  const { setToast } = useToast();
  const handleDelete = async (id) => {
    try {
      const data = await API.deletePainting(id);
      if (data.success) {
        setToast({ variant: "success", message: "Painting deleted" });
        setPaintings({
          ...paintings,
          data: paintings.data.filter((painting) => painting.id !== id),
        });
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      setToast({ variant: "danger", message: "Deleting painting failed" });
      console.log(error);
    }
  };
  const handleActionButtonClicked = async (id, index) => {
    setInteractedPainting(String(id) + index);
    await handleDelete(id);
    setInteractedPainting("");
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
      return { ...painting, actions: generateActions(painting.id) };
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
    </>
  );
}

export default PaintingsView;
