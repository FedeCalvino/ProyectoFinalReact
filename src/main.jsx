import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './Componentes/App';
import { NavBar } from './Componentes/NavBar';


const Domain = import.meta.env.REACT_APP_AUTH0_DOMAIN
const Client = import.meta.env.REACT_APP_CLIENT_ID
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <div className="app-container">
        <NavBar/>
        <App />
      </div>
  </BrowserRouter>
);
