import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from "formik";
import * as yup from 'yup';

// const AddChannelForm = ({ socket }) => {
//   const formik = useFormik({
//     initialValues: {
//       name: '',
//     },
//     validationSchema: yup.object().shape({
//       name: yup.string().required(),
//     }),
//     onSubmit: (values) => {
//       const { name } = values;
//       socket.emit('newChannel', { name });
//     }
//   })

//   return (
//     <Form onSubmit={formik.handleSubmit}>
//       <Form.Group>
//         <Form.Control
//           id='name'
//           name='name'
//           className='mb-2'
//           value={formik.values.message}
//           onChange={formik.handleChange}
//           onBlur={formik.handleBlur}
//           autoComplete="name"
//           disable={formik.isSubmitting === true ? 'true' : 'false'}
//         />
//         <Form.Label visuallyHidden>Имя канала</Form.Label>
//         <div className='d-flex justify-content-end'>
//           <Button className='me-2' variant='secondary'>Отменить</Button>
//           <Button type='submit'>Отправить</Button>
//         </div>
//       </Form.Group>
//     </Form>
//   )
// }

// const ChannelModal = (props) => (
//   <Modal
//     {...props}
//     size="m"
//     aria-labelledby="contained-modal-title-vcenter"
//     centered>
//     <Modal.Header closeButton>
//       <Modal.Title id="contained-modal-title-vcenter">
//         Добавить канал
//       </Modal.Title>
//     </Modal.Header>
//     <Modal.Body>
//       <AddChannelForm socket={props.socket} />
//     </Modal.Body>
//   </Modal>
// )

const AddChannelModal = ({ socket }) => {
  const [modalShow, setModalShow] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: yup.object().shape({
      name: yup.string().required(),
    }),
    onSubmit: (values) => {
      const { name } = values;
      socket.emit('newChannel', { name });
    }
  });

  return (
    <>
      <Button
        type="button"
        className='p-0 text-primary btn btn-group-vertical'
        variant="btn-primary-outline"
        onClick={() => setModalShow(true)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor"><path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"></path><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"></path></svg>
        <span className='visually-hidden'>+</span>
      </Button>
      <Modal
        show={modalShow}
        onHide={() => setModalShow(false)}
        size="m"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Добавить канал
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                id='name'
                name='name'
                className='mb-2'
                value={formik.values.message}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoComplete="name"
                disable={formik.isSubmitting === true ? 'true' : 'false'}
              />
              <Form.Label visuallyHidden>Имя канала</Form.Label>
              <div className='d-flex justify-content-end'>
                <Button className='me-2' variant='secondary'>Отменить</Button>
                <Button type='submit' onClick={() => setModalShow(false)}>Отправить</Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default AddChannelModal;
