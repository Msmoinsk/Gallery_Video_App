import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form'

function UploadBtn() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-primary" onClick={handleShow}>
        <AddIcon />
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload Your Pictures</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form setShow={setShow} show={show} />
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UploadBtn;