import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import init from './init.js';

const runApp = async () => {
  const socket = io();
  const root = ReactDOM.createRoot(document.getElementById('root'));
  const app = await init(socket);
  root.render(app);
};

runApp();
