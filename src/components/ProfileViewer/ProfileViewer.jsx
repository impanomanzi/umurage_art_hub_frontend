import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
function ProfileViewer({ show, profile, onHide }) {
  return (
    <Modal show={show} onHide={onHide} dialogClassName="modal-dialog">
      <Modal.Header closeButton>
        <Modal.Title>{profile.username}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="p">{profile.bio}</p>
      </Modal.Body>
      <Modal.Footer>
        {profile.instagram && (
          <Button
            variant="light"
            as="a"
            href={profile.instagram}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-instagram"></i>
          </Button>
        )}

        {profile.x && (
          <Button
            variant="light"
            as="a"
            href={profile.x}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-x-twitter"></i>
          </Button>
        )}

        {profile.facebook && (
          <Button
            variant="light"
            as="a"
            href={profile.facebook}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-facebook"></i>
          </Button>
        )}
        {profile.tiktok && (
          <Button
            variant="light"
            as="a"
            href={profile.tiktok}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-tiktok"></i>
          </Button>
        )}
        {profile.youtube && (
          <Button
            variant="light"
            as="a"
            href={profile.youtube}
            target="_blank"
            rel="noopener noreferrer"
          >
            <i class="fa-brands fa-youtube"></i>
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default ProfileViewer;
