import React from 'react';
import './Footer.css'

const Footer = ( {textRights="Escola SENAI de Informática - 2023"} ) => {
    return (
        <div>
            <footer className='footer-page'>
                <hr />
                <p className='footer-page__rights'>{textRights}</p>
            </footer>
        </div>
    );
};

export default Footer;