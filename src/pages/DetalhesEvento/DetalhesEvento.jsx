import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

// Serviços
import api from "../../Services/Service";

// Dados do usuário
import { UserContext } from "../../context/AuthContext";

// Components
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";
import { useParams } from "react-router-dom";
import { dateFormatDbToView } from "../../Utils/stringFunctions";

const DetalhesEvento = ({ dados }) => {
  const { userData } = useContext(UserContext);
  const [todosComentarios, setTodosComentarios] = useState([]);
  const [todosComentariosTrue, setTodosComentariosTrue] = useState([]);

  const { idEvento } = useParams();

  async function AllComentsEvents(id) {
    try {
      if (userData.role === "Administrador") {
        const promise = await api.get(
          `ComentariosEvento/ListarSomenteEvento/${idEvento}`
        );

        setTodosComentarios(promise.data);
      } else {
        const promise = await api.get(
          `ComentariosEvento/ListarSomenteEventoTrue/${idEvento}`
        );

        setTodosComentarios(promise.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    AllComentsEvents();
  }, [AllComentsEvents]);
  return (
    <MainContent>
      <Container>
        <Title titleText={"Detalhes Eventos"} additionalClass="custom-title" />
        <br />

        {todosComentarios.map((d) => {
          return (
            <div>
              <p>id: {d.idEvento}</p>
              <p>Nome do Evento: {d.evento.nomeEvento}</p>
              <p>Data do Evento: {dateFormatDbToView(d.evento.dataEvento)}</p>
              <p>Nome do usuário no feedback: {d.usuario.nome}</p>
              <p>Lista de feedback: {d.descricao}</p>

              <br />
            </div>
          );
        })}
      </Container>
    </MainContent>
  );
};

export default DetalhesEvento;
