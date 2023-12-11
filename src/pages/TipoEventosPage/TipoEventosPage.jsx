import React, { useEffect, useState } from "react";
import "./TipoEventosPage.css";
import Title from "../../Components/Title/Title";
import MainContent from "../../Components/MainContent/MainContent";
import ImageIllustrator from "../../Components/ImageIllustrator/ImageIllustrator";
import Container from "../../Components/Container/Container";
import { Input, Button } from "../../Components/FormComponents/FormComponents";
import eventTypeImage from "../../assets/images/tipo-evento.svg";
import api from "../../Services/Service";
import TableTp from "./TableTp/TableTp";

import Notification from "../../Components/Notification/Notification";
import Spinner from '../../Components/Spinner/Spinner'

const TipoEventosPage = () => {
  //state do componente Notification
  const [notifyUser, setNotifyUser] = useState({});
  
  const [showSpinner, setShowSpinner] = useState(false);

  const [frmEdit, setFrmEdit] = useState(false);

  const [titulo, setTitulo] = useState("");

  const [tipoEventos, setTipoEventos] = useState([]); //Array

  const [idEvento, setIdEvento] = useState(null);

  // Ao carregar a página 
  useEffect(() => {
    async function getNextEvents() {
      setShowSpinner(true)
      try {
        const promisse = await api.get(`/TiposEvento`);

        setTipoEventos(promisse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getNextEvents();
    setShowSpinner(false)
  }, []);

  async function handleSubmit(e) {
    //para o submit
    e.preventDefault();

    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O titulo deve conter no mínimo 3 caracteres");
      return;
    }

    // chamar api
    try {
      const retorno = await api.post("/TiposEvento", { titulo: titulo });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Cadastrado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      const promisse = await api.get(`/TiposEvento`);

      setTipoEventos(promisse.data);
    } catch (error) {
      console.log("Deu ruim na api");
      console.log(error);
    }
  }

  {
    /****** EDITAR CADASTRO ******/
  }

  // Atualização dos dados
  async function showUpdateForm(idElemento) {
    setFrmEdit(true);
    // fazer um getById

    try {
      const retorno = await api.get(`/TiposEvento/${idElemento}`);

      const { idTipoEvento, titulo } = await retorno.data;

      setTitulo(titulo);
      setIdEvento(idTipoEvento);
    } catch (error) {
      console.log("Não foi possível mostrar a tela de edição. Tente novamente");
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();

    // validar pelo menos 3 caracteres
    if (titulo.trim().length < 3) {
      alert("O titulo deve conter no mínimo 3 caracteres");
      return;
    }

    // chamar api
    try {
      const retorno = await api.put(`/TiposEvento/${idEvento}`, {
        titulo: titulo,
      });

      setNotifyUser({
        titleNote: "Sucesso",
        textNote: `Atualizado com sucesso!`,
        imgIcon: "success",
        imgAlt:
          "Imagem de ilustração de sucesso. Moça segurando um balão com símbolo de confirmação ok.",
        showMessage: true,
      });

      editActionAbort();

      const promisse = await api.get(`/TiposEvento`);

      setTipoEventos(promisse.data);
    } catch (error) {
      console.log(error);
    }
  }

  // Cancela a tela de edição de dados
  function editActionAbort() {
    setFrmEdit(false);
    setTitulo("");
    setIdEvento(null)
  }

  //FUNÇÃO DE DELETAR
  async function handleDelete(id) {
    try {
      const retorno = await api.delete(`/TiposEvento/${id}`);

      const promisse = await api.get(`/TiposEvento`);

      setTipoEventos(promisse.data);
    } catch (error) {}
  }

  return (
    <MainContent>
      <Notification {...notifyUser} setNotifyUser={setNotifyUser} />
       {showSpinner ? <Spinner/> : null }

      {/* CADASTRO DE TIPO DE EVENTOS */}
      <section className="cadastro-evento-section">
        <Container>
          <div className="cadastro-evento__box">
            <Title titleText={"Página de Tipos de Eventos"} />
            <ImageIllustrator
              alterText={"??????"}
              imageRender={eventTypeImage}
            />

            <form
              className="ftipo-evento"
              onSubmit={frmEdit ? handleUpdate : handleSubmit}
            >
              {!frmEdit ? (
                // Cadastrar
                <>
                  <Input
                    type={"text"}
                    id={"titulo"}
                    name={"titulo"}
                    placeholder={"Titulo"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => setTitulo(e.target.value)}
                  />
                  
                  <Button
                    type={"submit"}
                    name={"cadastrar"}
                    id={"cadastrar"}
                    textButton={"Cadastrar"}
                  />
                </>
              ) : (
                <>
                  <Input
                    id={"titulo"}
                    placeholder={"Título"}
                    name={"titulo"}
                    type={"text"}
                    required={"required"}
                    value={titulo}
                    manipulationFunction={(e) => setTitulo(e.target.value)}
                  />

                  <div className="buttons-editbox">
                    <Button
                      textButton={"Atualizar"}
                      id={"atualizar"}
                      name={"atualizar"}
                      type={"submit"}
                      additionalClass={"button-component--middle"}
                    />
                    <Button
                      textButton={"Cancelar"}
                      id={"cancelar"}
                      name={"cancelar"}
                      type={"button"}
                      manipulationFunction={editActionAbort}
                      additionalClass={"button-component--middle"}
                    />
                  </div>
                </>
              )}
            </form>
          </div>
        </Container>
      </section>

      {/* LISTAGEM DE TIPO DE EVENTOS */}

      <section className="lista-eventos-section">
        <Container>
          <Title titleText={"Lista de Tipo de Eventos"} color="white" />

          <TableTp
            dados={tipoEventos}
            fnUpdate={showUpdateForm}
            fnDelete={handleDelete}
          />
        </Container>
      </section>
    </MainContent>
  );
};

export default TipoEventosPage;
