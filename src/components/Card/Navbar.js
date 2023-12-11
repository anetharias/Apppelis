import React from "react";

const Navbar = () => {
  const estiloNavbar = {
    background: "url('https://images.pexels.com/photos/65128/pexels-photo-65128.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
    backgroundSize: "cover",  // Ajusta el tamaño de la imagen al contenedor
    backgroundPosition: "center",  // Centra la imagen en el contenedor
  };

  const estiloTexto = {
    color: "black", 
    fontWeight: "bolder" // Cambia este valor al color que desees
  };

  return (
    <nav className="navbar navbar-dark border-bottom border-white" style={estiloNavbar}>
      <div className="container">
        <a className="navbar-brand" href="/" style={estiloTexto}>
          PopPelis
        </a>
      </div>
    </nav>
  );
};

export default Navbar;