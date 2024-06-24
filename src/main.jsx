import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './Componentes/App';
import { NavBar } from './Componentes/NavBar';


const Domain = import.meta.env.REACT_APP_AUTH0_DOMAIN
const Client = import.meta.env.REACT_APP_CLIENT_ID
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Auth0Provider domain={Domain} client={Client} redirectUri={window.location.origin}>
      <div className="app-container">
        <NavBar/>
        <App />
      </div>
    </Auth0Provider>
  </BrowserRouter>
);
