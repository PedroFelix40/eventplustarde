import React, { useState } from "react";
import "./TestePage.css";
import Button from "../../Components/Button/Button";
import Header from "../../Components/Header/Header";
import Input from "../../Components/Input/Input";

const TestePage = () => {

    const [total, setTotal] = useState();
    const [n1, setN1] = useState();
    const [n2, setN2] = useState();

function handleCalcular(e) { //chamar submit no form
    e.preventDefault()
    setTotal(parseFloat(n1)+parseFloat(n2));
}

  return (
    <div className="main">
      <h1>Página de Teste</h1>

      <h3>Calculadora</h3>

      <form onSubmit={handleCalcular}>
      <Input 
      tipo="number" 
      id="numero1" 
      nome="numero1" 
      dicaCampo="Primeiro número" 
      valor={n1}
      fnAltera={setN1}
      />

      <Input 
      tipo="number" 
      id="numero2" 
      nome="numero2" 
      dicaCampo="Segundo número"
      valor={n2}
      fnAltera={setN2}
      />

      <Button tipo="submit" textoBotao="Somar" />

      <p>Resultado: <strong>{total}</strong></p>
      </form>
    </div>
  );
};

export default TestePage;
