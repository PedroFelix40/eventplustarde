import React, { useContext, useEffect, useState } from "react";

// Componentes
import MainContent from "../../Components/MainContent/MainContent";
import Title from "../../Components/Title/Title";
import Banner from "../../Components/Banner/Banner";
import VisionSection from "../../Components/VisionSection/VisionSection";
import ContactSection from "../../Components/ContactSection/ContactSection";
import NextEvent from "../../Components/NextEvent/NextEvent";
import Container from "../../Components/Container/Container";

// Css
import "./HomePage.css";

// Swiper 
import { register } from 'swiper/element/bundle'
import { Swiper, SwiperSlide } from "swiper/react";

// Swiper - CSS
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'

// Serviços 
import api from '../../Services/Service'
import { UserContext } from "../../context/AuthContext";

const HomePage = () => {

  // State do Proximos eventos
  const [nextEvents, setNextEvents] = useState([]);

  // Nesta parte instanciamos o Context, para que a sessão HomePage tenha acesso aos dados
  const { userData } = useContext(UserContext)

  useEffect(() => {
    async function getProximosEventos() {
      try {
        // chamar api
        const promisse = await api.get(
          "/Evento/ListarProximos"
        );

        console.log(promisse.data);
        setNextEvents(promisse.data);
      } catch (error) {
        console.log("Deu ruim na API");
      }
    }
    getProximosEventos();
  }, []);



  return (
    <MainContent>
      <Banner />

      {/* PRÓXIMOS EVENTOS*/}
      <section className="proximos-eventos">
        <Container>
          <Title titleText={"Próximos Eventos"} />
          <div className="events-box">
            <Swiper
              slidesPerView={3}
              pagination={{ clickable: true }}
              
            >
              {nextEvents.map((e) => {
                return (
                  <SwiperSlide>
                    <NextEvent
                      idEvento={e.idEvento}
                      title={e.nomeEvento}
                      description={e.descricao}
                      eventDate={e.dataEvento}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </Container>
      </section>

      <VisionSection />

      <ContactSection />
    </MainContent>
  );
};

export default HomePage;
