import { jwtDecode } from "jwt-decode";
import { createContext } from "react";

// Criamos um context para usarmos os dados de forma global
export const UserContext = createContext(null);

// método que irá receber o token e vai descodificar
export const UserDecodeToken = (theToken) => {
  const decoded = jwtDecode(theToken); // aqui retorna o payload

  return {
    role: decoded.role,
    name: decoded.name,
    userId: decoded.jti,
    token: theToken,
  };
};
