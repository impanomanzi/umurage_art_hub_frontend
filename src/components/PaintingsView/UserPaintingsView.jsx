import { useEffect, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { Link, Outlet } from "react-router-dom";
import { API } from "../../API/serverRequest";
import { paintingKeywords } from "../KeyWords/Keywords";
import StatusButton from "../StatusButton/StatusButton";
import { useMemo } from "react";
import useToast from "../../hooks/useToast";
import useUser from "../../hooks/useUser";
import useAPI from "../../hooks/useApi";
function UserPaintingsView() {
  const [paintings, setPaintings] = useState([]);
  const [interactedPainting, setInteractedPainting] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const { setToast } = useToast();
  const user = useUser();
  const { API } = useAPI();
  const getPaintings = async () => {
    const formData = new FormData();
    formData.append("userId", user.id);
    const resp = await API.getUserPaintings(formData);
    if (resp.success) {
      setPaintings(resp.data);
    }
    setIsLoading(false);
  };
  const handleDelete = async (id) => {
    try {
      const resp = await API.deletePainting(id);
      if (resp.success) {
        setToast({ variant: "success", message: "Painting deleted" });
        setPaintings(resp.data);
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
    return paintings.map((painting) => {
      return { ...painting, actions: generateActions(painting.id) };
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
    </>
  );
}

export default UserPaintingsView;
