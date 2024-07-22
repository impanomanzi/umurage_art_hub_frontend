import { useEffect, useState, useMemo } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { painterKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import useToast from "../../hooks/useToast";
function PainterView() {
  const [painters, setPainters] = useState([]);
  const [interactedPainter, setInteractedPainter] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const getPainters = async () => {
    const resp = await API.getPainters();
    setPainters(resp);
    setIsLoading(false);
  };

  const handleDelete = async (id) => {
    try {
      const data = await API.deletePainter(id);
      if (data.success) {
        setToast({ variant: "success", message: "Painter account deleted" });
        setPainters((prevPainters) =>
          prevPainters.filter((painter) => painter.id !== id)
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
    await handleDelete(id);
    setInteractedPainter("");
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
    </>
  );
}

export default PainterView;
