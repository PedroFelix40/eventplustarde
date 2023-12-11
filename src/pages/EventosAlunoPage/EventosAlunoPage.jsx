import React, { useContext, useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Table from "./TableEvA/TableEvA";
import Container from "../../Components/Container/Container";
import { Select } from "../../Components/FormComponents/FormComponents";
import Spinner from "../../Components/Spinner/Spinner";
import Modal from "../../Components/Modal/Modal";
import api from "../../Services/Service";

import "./EventosAlunoPage.css";
import { UserContext } from "../../context/AuthContext";
import Notification from "../../Components/Notification/Notification";

const EventosAlunoPage = () => {
  // state do menu mobile
  const [exibeNavbar, setExibeNavbar] = useState(false);
  const [eventos, setEventos] = useState([]);
  // select mocado
  const [quaisEventos, setQuaisEventos] = useState([
    { value: "1", text: "Todos os eventos" },
    { value: "2", text: "Meus eventos" },
  ]);

  const [tipoEvento, setTipoEvento] = useState("1"); //código do tipo do Evento escolhido
  const [showSpinner, setShowSpinner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // recupera os dados globais do usuário
  const { userData, setUserData } = useContext(UserContext);

  // notificação
  const [notifyUser, setNotifyUser] = useState({});

  // Objeto do Comentário
  const [ comentario, setComentario ] = useState({
    descricao: "",
    exibe: "",     
    idUsuario: "",     
    idEvento: ""
  })

  async function loadEventsType() {
    setShowSpinner(true);

    // Trazer todos os eventos
    try {
      if (tipoEvento === "1") {
        const promise = await api.get(`/Evento`);
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );

        const dadosMarcados = verificaPresenca(
          promise.data,
          promiseEventos.data
        );
        

        setEventos(promise.data);
      } else if (tipoEvento === "2") {
        // Minhas presenças
        let arrEventos = [];
        const promiseEventos = await api.get(
          `/PresencasEvento/ListarMinhas/${userData.userId}`
        );
        promiseEventos.data.forEach((element) => {
          arrEventos.push({
            ...element.evento,
            situacao: element.situacao,
            idPresencaEvento: element.idPresencaEvento,
          });
        });
        setEventos(arrEventos);
      }
    } catch (error) {
      console.log("Erro ao carregar os eventos");
    }
    setShowSpinner(false);
  }

  useEffect(() => {
    loadEventsType();
  }, [tipoEvento, userData.userId]);

  const verificaPresenca = (arrAllEvents, eventsUser) => {
    for (let x = 0; x < arrAllEvents.length; x++) {
      // Para cada evento (todos)

      //Verifica se o aluno está participando do evento atual (x)
      for (let i = 0; i < eventsUser.length; i++) {
        if (arrAllEvents[x].idEvento === eventsUser[i].idEvento) {
          arrAllEvents[x].situacao = true;
          arrAllEvents[x].idPresencaEvento = eventsUser[i].idPresencaEvento;
          break;
        }
      }
    }
    // Devolve o array modificado
    return arrAllEvents;
  };

  // toggle meus eventos ou todos os eventos
  function myEvents(tpEvent) {
    setTipoEvento(tpEvent);
  }
  // ler um comentário - get
  const loadMyComentary = async (idUser, idEvento) => {
    try {
      const promise = await api.get(`/ComentariosEvento/BuscarPorIdUsuario?idUser=${idUser}&idEvent=${idEvento}`)

      setComentario(promise.data)

      console.log(promise.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Cadastra comentário - post
  const postMyComentary = async (comentario) => {
    // alert("Cadastrar comentário")
    try {
      const {descricao, exibe, idUsuario, idEvento} = comentario

      const retorno = await api.post("/ComentariosEvento", {
        descricao: descricao,
        exibe: exibe,     
        idUsuario: idUsuario,     
        idEvento: idEvento,
      })

      
    } catch (error) {
      console.log(error);
    }
  }

  // Remove comentário - delete
  const commentaryRemove = async (idComentary) => {
    try {
      const promise = await api.delete("/Comentario", {idComentary})
    } catch (error) {
      console.log(error);
    }
  };

  // abre a sessão comentário
  const showHideModal = () => {
    setShowModal(showModal ? false : true);
  };

  async function handleConnect(
    idEvent,
    whatTheFunction,
    idPresencaEvento = null
  ) {
    // conecta o usuário e atualiza a tela
    if (whatTheFunction === "connect") {
      try {
        const promise = await api.post("/PresencasEvento", {
          situacao: true,
          idUsuario: userData.userId,
          idEvento: idEvent,
        });
        if (promise.status === 201) {
          loadEventsType();
          setNotifyUser({
            titleNote: "Sucesso",
            textNote: `Conectado com sucesso!`,
            imgIcon: "success",
            imgAlt:
              "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
            showMessage: true,
          });
        }
      } catch (error) {
        setNotifyUser({
          titleNote: "Erro",
          textNote: `Erro ao conectar`,
          imgIcon: "danger",
          imgAlt: "",
          showMessage: true,
        });
        console.log(error);
      }
      return;
    }

    // unconnect
    const promiseDelete = await api.delete(
      "/PresencasEvento/" + idPresencaEvento
    );
    if (promiseDelete.status === 204) {
      loadEventsType();
      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Desconectado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });
    }
  }

  return (
    <>
      <MainContent>
        <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
        <Container>
          <Title titleText={"Eventos"} additionalClass="custom-title" />

          <Select
            id="id-tipo-evento"
            name="tipo-evento"
            required={true}
            dados={quaisEventos} // aqui o array dos tipos
            manipulationFunction={(e) => myEvents(e.target.value)} // aqui só a variável state
            selectValue={tipoEvento}
            additionalClass="select-tp-evento"
          />
          <Table
            dados={eventos}
            fnConnect={handleConnect}
            fnShowModal={() => {
              showHideModal();
            }}
          />
        </Container>
      </MainContent>

      {/* SPINNER -Feito com position */}
      {showSpinner ? <Spinner /> : null}

      {showModal ? (
        <Modal
          userId={userData.userId}
          showHideModal={showHideModal}
          fnGet={loadMyComentary}
          fnPost={postMyComentary}
          fnDelete={commentaryRemove}
        />
      ) : null}
    </>
  );
};

export default EventosAlunoPage;
