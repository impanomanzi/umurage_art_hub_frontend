import Modal from "react-bootstrap/Modal";
import TextareaAutosize from "react-textarea-autosize";
import useCustomer from "../../hooks/useCustomer";
import { useState } from "react";
import { API } from "../../API/serverRequest";
import useToast from "../../hooks/useToast";
import CustomLoadingButton from "../FormButton/FormButton";
function CommentForm({ show, onHide, exId }) {
  const { setToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [comment, setComment] = useState({
    ex_id: exId,
    cust_id: useCustomer(),
    text: "",
  });
  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    try {
      const resp = await API.addComment(JSON.stringify(comment));
      if (resp.success) {
        onHide();
        setToast({ variant: "success", message: "Your comment accepted" });
      } else {
        setToast({ variant: "danger", message: resp.message });
      }
    } catch (error) {
      setToast({ variant: "danger", message: error.message });
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <Modal show={show} onHide={onHide} dialogClassName="my-modal-dialog">
      <Modal.Header closeButton>
        <Modal.Title>
          <h2
            style={{
              fontSize: "1em",
            }}
          >
            Give us your comment
          </h2>
        </Modal.Title>
      </Modal.Header>
      <form onSubmit={handleOnSubmit}>
        <Modal.Body>
          <TextareaAutosize
            onChange={(event) => {
              setComment({ ...comment, text: event.target.value });
            }}
            className="form-control"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <CustomLoadingButton
            isLoading={isLoading}
            onClick={null}
            text="Post"
            buttonType="submit"
          />
        </Modal.Footer>
      </form>
    </Modal>
  );
}

export default CommentForm;
