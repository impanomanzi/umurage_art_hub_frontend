import { useRef, useState, useEffect } from "react";
import { Modal,Form } from "react-bootstrap";
import CustomLoadingButton from "../../FormButton/FormButton";
import useToast from "../../../hooks/useToast";
import TextareaAutosize from "react-textarea-autosize";

function EditBlogForm({ show, onHide, blogData, onSubmit }) {
  const { setToast } = useToast();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const[created, setCreated]= useState("")
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();
  useEffect(() => {
    if (blogData) {
      setTitle(blogData.title || "");
      setContent(blogData.content || "");
      setAuthor(blogData.author || "");
    }
  }, [blogData]);

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("id", blogData.id);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("author", author);
      formData.append("created", created);
      await onSubmit(blogData.id, formData);
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
          <Modal.Title>Edit Blog</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="title">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>

         
         

          <Form.Group controlId="content">
            <Form.Label>Content</Form.Label>
            <TextareaAutosize
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="form-control"
            />
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

export default EditBlogForm;
