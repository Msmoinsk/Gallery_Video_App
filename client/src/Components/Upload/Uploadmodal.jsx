import { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddIcon from '@mui/icons-material/Add';
import Form from './Form'
import { NameContext } from '../LoginSignUp/LoginSignUp';

function UploadBtn() {
  const [show, setShow] = useState(false);
  
  // const[tokenAccess, setTokenAccess] = useState()
  const { name } = useContext(NameContext)
  const addBtn = name || localStorage.getItem('token')

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const loginAlert = () => alert('Please Login first.')

  return (
    <>
      <Button variant="outline-primary" onClick={ !addBtn ? loginAlert : handleShow }>
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