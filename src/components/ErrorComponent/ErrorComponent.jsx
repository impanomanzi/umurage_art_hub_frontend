import { useState } from "react";
import Alert from "react-bootstrap/Alert";
import Button from "react-bootstrap/Button";

function ErrorComponent() {
  const [show, setShow] = useState(true);

  return (
    <Alert variant="danger">
      <Alert.Heading>we got an error!</Alert.Heading>
      <p>Refresh page and try again</p>
    </Alert>
  );
}

export default ErrorComponent;
