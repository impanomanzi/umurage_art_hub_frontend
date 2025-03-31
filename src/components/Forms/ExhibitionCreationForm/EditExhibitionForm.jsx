import { useRef, useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";
import TextareaAutosize from "react-textarea-autosize";
import ReactMarkdown from "react-markdown";

function EditExhibitionForm({ show, onHide, exhibitionData, onSubmit }) {
  const { setToast } = useToast();
  const [name, setName] = useState("");
  const [host, setHost] = useState("");
  const [startdate, setStartdate] = useState("");
  const [enddate, setEnddate] = useState("");
  const [fees, setFees] = useState("");
  const [status, setStatus] = useState("");
  const [banner, setExhibitionBanner] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    if (exhibitionData) {
      setName(exhibitionData.name || "");
      setHost(exhibitionData.host || "");
      setStartdate(exhibitionData.startdate || "");
      setEnddate(exhibitionData.enddate || "");
      setFees(exhibitionData.fees || "");
      setExhibitionBanner(exhibitionData.image || "");
      setDescription(exhibitionData.description || "");
      setStatus(exhibitionData.status || "");
    }
  }, [exhibitionData]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("host", host);
      formData.append("start_date", startdate);
      formData.append("end_date", enddate);
      formData.append("entrace_fees", fees);
      formData.append("banner", banner);
      formData.append("description", description);
      formData.append("status", status);
      await onSubmit(exhibitionData.id, formData);
      formRef.current.reset();
      onHide();
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      backdrop="static"
      keyboard={false}
      style={{ zIndex: 12002 }}
    >
      <Form onSubmit={handleOnSubmit} ref={formRef}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Exhibition</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="name">
            <Form.Label>Exhibition Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="host">
            <Form.Label>Host</Form.Label>
            <Form.Control
              type="text"
              value={host}
              onChange={(e) => setHost(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="startdate">
            <Form.Label>Start Date</Form.Label>
            <Form.Control
              type="date"
              value={startdate}
              onChange={(e) => setStartdate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="enddate">
            <Form.Label>End Date</Form.Label>
            <Form.Control
              type="date"
              value={enddate}
              onChange={(e) => setEnddate(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="fees">
            <Form.Label>Entrance Fees</Form.Label>
            <Form.Control
              type="number"
              value={fees}
              onChange={(e) => setFees(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="banner">
            <Form.Label>Exhibition Banner</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const file = e.target.files[0];
                setExhibitionBanner(file);
                const previewUrl = URL.createObjectURL(file);
                const imgElement = `<img src="${previewUrl}" width="200px" style="border-radius:20px"/>`;
                e.target.parentElement.querySelector(
                  ".exhibition-preview"
                ).innerHTML = imgElement;
              }}
            />
            <div className="exhibition-preview my-2"></div>
          </Form.Group>

          <Form.Group controlId="description">
            <Form.Label>Description</Form.Label>
            <TextareaAutosize
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="form-control"
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Preview</Form.Label>
            <ReactMarkdown>{description}</ReactMarkdown>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <CustomLoadingButton
            isLoading={isLoading}
            text="Save Changes"
            buttonType="submit"
          />
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default EditExhibitionForm;
