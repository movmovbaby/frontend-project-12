import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Channels from "./Channels.jsx";
import Messages from "./Messages.jsx";
import Wrapper from './Wrapper.jsx';

const Chat = () => {
  return (
    <Wrapper>
      <Container className="h-100 my-4 overflow-hidden rounded shadow">
        <Row className='h-100 bg-white flex-md-row'>
          <Col className='col-4 col-md-2 border-end pt-5 px-0 bg-light'><Channels /></Col>
          <Col className='col p-0 h-100'><Messages /></Col>
        </Row>
      </Container>
    </Wrapper>
  )
}
export default Chat;
