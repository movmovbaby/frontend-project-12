import React from 'react';
import { useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/esm/Button';
import { useTranslation } from 'react-i18next';
import * as leoProfanity from 'leo-profanity';
import useAuth from '../hooks';

const MessageForm = ({ socket }) => {
  const { t } = useTranslation();
  const { userData } = useAuth();
  const { username } = userData;

  leoProfanity.loadDictionary('ru');

  const currentChannelId = useSelector((state) => state.channelsInfo.currentChannelId);
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    validationSchema: yup.object().shape({
      message: yup.string().required(),
    }),
    onSubmit: (values) => {
      formik.isSubmitting = true;
      const filtredMessage = leoProfanity.clean(values.message);

      const message = { body: filtredMessage, username, channelId: currentChannelId };
      socket.timeout(3000).emit('newMessage', message, (error) => {
        if (error) {
          console.log('Socket.io error while emit message');
          formik.isSubmitting = false;
        } else {
          formik.isSubmitting = false;
          /* eslint-disable-next-line no-param-reassign */
          values.message = '';
        }
      });
    },
  });

  return (
    <Form className="py-1 border rounded-2" onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          className="border-0 p-0 ps-2 form-control"
          placeholder={t('messagesForm.placeholder')}
          aria-label="Новое сообщение"
          id="message"
          name="message"
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete="message"
          required=""
          disable={formik.isSubmitting.toString()}
        />
        <Button
          className="btn-group-vertical"
          type="submit"
          variant="btn-primary-outline"
          disable={formik.isSubmitting.toString()}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
            <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
          </svg>
          <span className="visually-hidden">{t('messagesForm.submitButton')}</span>
        </Button>
      </InputGroup>
    </Form>
  );
};

export default MessageForm;
