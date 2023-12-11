import React, { useState } from 'react';
import './Header.css';
import Container from '../Container/Container';
import Nav from '../Nav/Nav'
import PerfilUsuario from '../PerfilUsuario/PerfilUsuario'
import menubar from '../../assets/images/menubar.png'



const Header = () => {
    const [exibeNavbar, setExibeNavbar] = useState(false)
    return (
        <header className='headerpage'>
            <Container>
                <div className='header-flex '>
                    <img 
                        className='headerpage__menubar'
                        src={menubar} 
                        alt="Imagem de barras. Serve para esconder o menu no smartphone" 
                        onClick={() => {setExibeNavbar(true)}}
                    />

                    <Nav 
                    exibeNavbar={exibeNavbar}
                    setExibeNavbar={setExibeNavbar}
                    />

                    <PerfilUsuario/>
                </div>
            </Container>
        </header>
    );
};

export default Header;