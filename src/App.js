import Rotas from "./Routes/routes";
import { UserContext } from "./context/AuthContext";
import { useEffect, useState } from "react";

function App() {
  const [userData, setUserData] = useState(UserContext);

  useEffect(() => {
    const token = localStorage.getItem("token")
    setUserData(token === null ? {} : JSON.parse(token))

  }, []);

  return (
    // Aqui colocamos a Context para que possa prover dados para todo o projeto
    <UserContext.Provider value={{ userData, setUserData }}>
      <Rotas />
    </UserContext.Provider>
  );
}

export default App;
