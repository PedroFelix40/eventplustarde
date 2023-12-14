import React, { useState } from "react";
import { useContext } from "react";
import { useEffect } from "react";

// Serviços
import api from "../../Services/Service";
import { useParams } from "react-router-dom";
import { dateFormatDbToView } from "../../Utils/stringFunctions";

// Dados do usuário
import { UserContext } from "../../context/AuthContext";

// Components
import MainContent from "../../components/MainContent/MainContent";
import Container from "../../components/Container/Container";
import Title from "../../components/Title/Title";

const DetalhesEvento = ({}) => {
  const { userData } = useContext(UserContext);
  const [todosComentarios, setTodosComentarios] = useState([]);

  // Use o parametro passado pela url
  const { idEvento } = useParams();

  async function AllComentsEvents() {
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
  }, [todosComentarios]);
  return (
    <MainContent>
      <Container>
        <Title titleText={"Detalhes Eventos"} additionalClass="custom-title" />
        <br />

        <table className="tbal-data">
          <thead className="tbal-data__head">
            <tr className="tbal-data__head-row tbal-data__head-row--red-color">
              <th className="tbal-data__head-title tbal-data__head-title--big">
                Nome do Evento
              </th>
              <th className="tbal-data__head-title tbal-data__head-title--big">
                Nome do usuário
              </th>
              <th className="tbal-data__head-title tbal-data__head-title--big">
                Lista de Feedback
              </th>
              <th className="tbal-data__head-title tbal-data__head-title--big">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {todosComentarios.map((d) => {
              return (
                <tr className="tbal-data__head-row">
                  <td className="tbal-data__data tbal-data__data--big">
                    {d.evento.nomeEvento}
                  </td>

                  <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                    {d.usuario.nome}
                  </td>

                  <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                    {d.descricao}
                  </td>

                  <td className="tbal-data__data tbal-data__data--big tbal-data__btn-actions">
                    {dateFormatDbToView(d.evento.dataEvento)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {/* {todosComentarios.map((d) => {
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
        })} */}
      </Container>
    </MainContent>
  );
};

export default DetalhesEvento;
