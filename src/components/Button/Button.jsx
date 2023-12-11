import React, { useState } from 'react';

const Button = (props) => { //construtor
    return (
        <button type={props.tipo}>
            {props.textoBotao}
        </button>
    );
};

export default Button;