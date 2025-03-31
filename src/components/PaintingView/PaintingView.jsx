import { useEffect, useMemo, useState } from "react";
import FormNavbar from "../NavBar/FormNavbar";
import { useParams } from "react-router-dom";
import { API } from "../../API/serverRequest";
import Spinner from "react-bootstrap/Spinner";
import useImageViewer from "../../hooks/useImageViewer";


function PaintingView() {
  const{setImageUrl}= useImageViewer()
  const [painting, setPainting] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const name = useParams().name;
  const id = useParams().id;
  const getPainting = async () => {
    try {
      const resp = await API.getPaintingById(name, id);
      if (resp.success) setPainting(resp.data);
      else {
        throw new Error("");
      }
    } catch (error) {
      setToast({
        variant: "danger",
        message: error.message,
      });
    } finally {
      setIsLoading(false);
    }
  };
  const imageUrl = useMemo(() => {
    let index1 = painting?.image?.indexOf("upload/") + "upload/".length;
    let newUrl =
      painting?.image?.substring(0, index1) +
      "q_auto:best/" +
      painting?.image?.substring(index1, painting?.image?.length);
    return newUrl;
  }, [painting]);

  useEffect(() => {
    getPainting();
  }, []);

  useEffect(()=>{
    setImageUrl(imageUrl)
  },[imageUrl])
  return (
    <>
      <FormNavbar />
      

      <div>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <Spinner />
          </div>
        ):<h1><a className="btn btn-primary" href={`"/gallery/${name}"`}>Go to {name} Gallery</a></h1>}
       
      </div>
    </>
  );
}

export default PaintingView;
