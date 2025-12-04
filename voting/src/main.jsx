import axios from "axios";     // ADD THIS
axios.defaults.withCredentials = true;   // Allows cookies/session
axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Backend URL


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App.jsx';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import store from './store/store.js'; // import only the store

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      />
    </Provider>
  </StrictMode>
);





// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import {Provider} from 'react-redux';
// import './index.css'
// import App from './App.jsx'
// import store from './store/store.js';

 

// createRoot(document.getElementById('root')).render(<Provider store={store}> <App /> </Provider>
 
// )