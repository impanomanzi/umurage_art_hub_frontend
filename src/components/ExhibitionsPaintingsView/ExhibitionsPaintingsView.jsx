import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";

function ExhibitionsPaintingsView() {
  const [exhibitionPaintings, setExhibitionPaintings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
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
  const handleDelete = async (id) => {
    try {
      const resp = await API.deleteExhibitionPainting(id);
      if (resp.success) {
        setToast({
          variant: "success",
          message: "Painting deleted",
        });
        setExhibitionPaintings((exhibitionPaintings) =>
          exhibitionPaintings.filter((painting) => painting.id !== id)
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
    await handleDelete(id);
    setInteractedExhibition("");
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
      return { ...painting, actions: generateActions(painting.id) };
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
    </>
  );
}

export default ExhibitionsPaintingsView;
