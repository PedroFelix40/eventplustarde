import React, { useContext } from "react";
import "./Nav.css";
import logoDesktop from "../../assets/images/logo-pink.svg";
import logoMobile from "../../assets/images/logo-white.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/AuthContext";

const Nav = ({ setExibeNavbar, exibeNavbar }) => {
  // os dados serão utlilizados apenas para pesquisa
  const { userData } = useContext(UserContext);

  return (
    <nav className={`navbar ${exibeNavbar ? "exibeNavbar" : ""}`}>
      <span
        className="navbar__close"
        onClick={() => {
          setExibeNavbar(false);
        }}
      >
        x
      </span>

      <Link to="/">
        <img
          className="eventlogo__logo-image"
          src={window.innerWidth >= 992 ? logoDesktop : logoMobile}
          alt="Event Plus Logo"
        />
      </Link>

      <div className="navbar__items-box">
        {/* Link público */}
        <Link className="navbar__items-box__link" to="/">
          Home
        </Link>

        {/* Link privado */}
        {userData.role === "Administrador" ? (
          <>
            <Link className="navbar__items-box__link" to="/tipo-eventos">
              Tipo Eventos
            </Link>
            <Link className="navbar__items-box__link" to="/eventos">
              Eventos
            </Link>
          </>
        ) : //if
        userData.role === "Comum" ? (
          <Link className="navbar__items-box__link" to="/eventos-aluno">
            Eventos
          </Link>
        ) : (null)}
      </div>
    </nav>
  );
};

export default Nav;
