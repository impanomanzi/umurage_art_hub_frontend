import Alert from "react-bootstrap/Alert";

function ErrorComponent() {
  return (
    <Alert variant="danger">
      <Alert.Heading>we got an error!</Alert.Heading>
      <p>Refresh page and try again</p>
    </Alert>
  );
}

export default ErrorComponent;
