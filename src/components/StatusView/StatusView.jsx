import Spinner from "react-bootstrap/Spinner";
import Badge from "react-bootstrap/Badge";
function StatusView({ status, isLoading }) {
  return (
    <Badge
      bg={
        status === "pending"
          ? "warning"
          : status === "active"
          ? "success"
          : null
      }
    >
      {isLoading ? <Spinner /> : status}
    </Badge>
  );
}

export default StatusView;
