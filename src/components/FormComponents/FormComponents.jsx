import React from "react";
import "./FormComponents.css";

export const Input = ({
  type,
  id,
  name,
  value,
  required,
  additionalClass = "",
  placeholder,
  manipulationFunction,
}) => {
  return (
    <input
      type={type}
      id={id}
      name={name}
      value={value}
      required={required}
      className={`input-component ${additionalClass}`}
      placeholder={placeholder}
      onChange={manipulationFunction}
      autoComplete="off"
    />
  );
};

export const Button = ({
  id,
  name,
  type,
  additionalClass = "",
  textButton,
  manipulationFunction,
}) => {
  return (
    <button
      type={type}
      name={name}
      id={id}
      className={`button-component ${additionalClass}`}
      onClick={manipulationFunction}
    >
      {textButton}
    </button>
  );
};

export const Select = ({ 
    dados, 
    id, 
    name, 
    required,
    additionalClass = "",
    manipulationFunction,
    selectValue = ''
}) => {
  return (
    
    <select 
        id={id}
        name={name} 
        required={required}
        className={`input-component ${additionalClass}`}
        onChange={manipulationFunction}
        value={selectValue}
        > 
      <option value="">Selecione</option>
      {dados.map((opt) => {
        return (
          <option key={opt.value} value={opt.value}>
            {opt.text}
          </option>
        );
      })}
    </select>
  );}

  export const SelectEv = ({ 
    dados, 
    id, 
    name, 
    required,
    additionalClass = "",
    manipulationFunction,
    selectValue = ''
}) => {
  return (
    
    <select 
        id={id}
        name={name} 
        required={required}
        className={`input-component ${additionalClass}`}
        onChange={manipulationFunction}
        value={selectValue}
        > 
      <option value="">Selecione</option>
      {dados.map((opt) => {
        return (
          <option key={opt.idTipoEvento} value={opt.idTipoEvento}>
            {opt.titulo}
          </option>
        );
      })}
    </select>
  );}




