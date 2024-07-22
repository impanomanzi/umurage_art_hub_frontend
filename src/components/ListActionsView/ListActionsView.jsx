import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";

function ListActionsView({ actions }) {
  return (
    <ButtonGroup aria-label="list actions">
      {actions.map((action, index) => {
        <Button variant={action.variant} onClick={action.callback} key={index}>
          {action.text}
        </Button>;
      })}
    </ButtonGroup>
  );
}

export default ListActionsView;
