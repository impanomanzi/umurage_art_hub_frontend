import { Modal,Form, Button  } from "react-bootstrap";
import { useState } from "react";
import CustomLoadingButton from "../../FormButton/FormButton";
import Stack from 'react-bootstrap/Stack';
function LogoutConfirmDialog({showModal ,onClick,onClose}) {
      const [isLoading, setIsLoading] = useState(false);

      const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        await onClick();
        setIsLoading(false);
        onClose();
     
      };
  return <Modal show={showModal} style={{ zIndex: 15000 }}  backdrop="static"
  keyboard={false} >
        <Modal.Header>
          <Modal.Title>Confirm Logout.</Modal.Title>
        </Modal.Header>
        <Modal.Body>      
        <Form onSubmit={handleSubmit}>
            <p>Do you really want to logout?</p>
            <Stack gap={2} className="col-md-5 mx-auto">
            <CustomLoadingButton
              isLoading={isLoading}
              onClick={null}
              text="Yes"
              buttonType="submit"
              className="mt-3"
              variant="btn-danger"
              
            />
            <Button variant="secondary" onClick={onClose} disabled={isLoading} >No</Button>
    </Stack>
    </Form>
        </Modal.Body>
      </Modal>
  
}

export default LogoutConfirmDialog;