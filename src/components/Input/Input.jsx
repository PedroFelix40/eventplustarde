import React, {useState} from "react";

const Input = (props) => { ///construtor
  const [meuValor, setMeuValor] = useState();

  return (
    <div>
      <input 
      type={props.tipo} 
      id={props.id} 
      name={props.nome} 
      placeholder={props.dicaCampo} 
      value={props.valor} 
      onChange={(e) => {
     //   setMeuValor(e.target.value) //valor do atual componente

     props.fnAltera(e.target.value)
      }} />

      <span>{props.valor}</span>
    </div>
  );
};

export default Input;
