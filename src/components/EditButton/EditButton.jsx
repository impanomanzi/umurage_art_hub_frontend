import Button from "react-bootstrap/Button";
function EditButton({ action, variant }) {
  return (
    <Button variant={variant} onClick={action}>
      <i className="fas fa-pen"></i>
    </Button>
  );
}

export default EditButton;
