import React from "react";
import { createRoot } from 'react-dom/client';
import './index.css'

import List from "./containers/list";
import Navbar from "./components/Card/Navbar"



const container = document.getElementById("root");
const root = createRoot(container); // createRoot(container!) si usas TypeScript

import "bootswatch/dist/lux/bootstrap.min.css";
import "./index.css";

const App = () => {
  return (
    <>

     
      <Navbar />
     

      <main className="gris-fondo">
      <div className="container">
        <List />
      </div>
    </main>

      
    </>

    
  );
};
root.render(<App tab="home" />);