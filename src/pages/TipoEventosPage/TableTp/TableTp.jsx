import React from "react";
import "./TableTp.css";

import editPen from '../../../assets/images/edit-pen.svg'
import trashDelete from '../../../assets/images/trash-delete.svg'

const TableTp = ({dados, fnUpdate, fnDelete}) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Editar
          </th>
          <th className="table-data__head-title table-data__head-title--little">
            Deletar
          </th>
        </tr>
      </thead>

      <tbody className="table-data__tbody">
          {/* map dos dados */}
          {/* criar um map na variável dados e colocar a linha abaixo dentro do return do map */}
          
      {dados.map((dados) => {
                return(
                    <tr className="table-data__head-row">
          <td className="table-data__data table-data__data--big">
            {dados.titulo}
          </td>

          <td className="table-data__data table-data__data--little">
            <img 
                className="table-data__icon"    
                src={editPen}   
                alt="" 
                onClick={
                () => {
                    fnUpdate(dados.idTipoEvento)
                }
            }
            />
          </td>

          <td className="table-data__data table-data__data--little">
            <img 
                className="table-data__icon" 
                src={trashDelete} 
                alt="" 
                onClick={
                    () => {
                        fnDelete(dados.idTipoEvento)
                    }
                }
            />
          </td>
        </tr>
                )
            })}

      </tbody>
    </table>
  );
};

export default TableTp;
