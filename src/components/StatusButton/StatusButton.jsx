import Spinner from "react-bootstrap/Spinner";
import Button from "react-bootstrap/Button";
function StatusButton({ action, isLoading, text, variant }) {
  return (
    <Button variant={variant} onClick={action} disabled={isLoading}>
      {isLoading && <Spinner />} &nbsp;{text}
    </Button>
  );
}

export default StatusButton;
