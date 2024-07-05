import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Sites from './Sites';
import Services from './services';
import {createBrowserRouter, RouterProvider } from 'react-router-dom';
import Salarie from './salarie';
import Connexion from './connexion';
import Forget from './forget';

const router = createBrowserRouter([
  {
    path: "/home",
    element: <App/>,
  },{path : "/sites",
  element : <Sites/>},
  {path : "/services",
  element : <Services/> },
  {path:"/salaries",
    element:<Salarie/>
  },{path:"/",
    element:<Connexion/>
  },
  {path : "/forget",
  element : <Forget/>}
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

