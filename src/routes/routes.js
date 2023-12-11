import React from "react";

//import dos componentes de rota
import { BrowserRouter, Routes, Route } from "react-router-dom";

//import dos componentes da página
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import EventosPage from "../Pages/EventosPage/EventosPage";
import EventosAlunoPage from "../Pages/EventosAlunoPage/EventosAlunoPage";
import TipoEventosPage from "../Pages/TipoEventosPage/TipoEventosPage";
import TestePage from "../Pages/TestePage/TestePage";

import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import { PrivateRoute } from "./PrivateRoute";

const Rotas = () => {
  return (
    // criar a estrutura de rotas
    <BrowserRouter>
      <Header />
      <Routes>
        <Route element={<HomePage />} path="/" exact />

        <Route
          path="/tipo-eventos"
          element={
            <PrivateRoute redirectTo="/">
              <TipoEventosPage />
            </PrivateRoute>
          }
        />
        <Route
          path="/eventos"
          element={
            <PrivateRoute redirectTo="/">
              <EventosPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/eventos-aluno"
          element={
            <PrivateRoute redirectTo="/">
              <EventosAlunoPage />
            </PrivateRoute>
          }
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route element={<TestePage />} path="/testes" />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Rotas;
