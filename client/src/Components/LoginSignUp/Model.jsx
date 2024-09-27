import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import React from 'react';
import LoginSignUp from './LoginSignUp';

function MyVerticallyCenteredModal(props) {
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
        <LoginSignUp />
      </Modal.Body>
    </Modal>
  );
}

function LoginBtn() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <Button variant="outline-primary" onClick={() => setModalShow(true)}>
        Login
      </Button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default LoginBtn