import React from "react";
import "./TableEv.css";

import editPen from "../../../assets/images/edit-pen.svg";
import trashDelete from "../../../assets/images/trash-delete.svg";
import { dateFormatDbToView } from "../../../Utils/stringFunctions";
import { Tooltip } from "react-tooltip";

const TableEv = ({ dados, fnUpdate, fnDelete }) => {
  return (
    <table className="table-data">
      <thead className="table-data__head">
        <tr className="table-data__head-row">
          <th className="table-data__head-title table-data__head-title--big">
            Título
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Descrição
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Tipo Evento
          </th>
          <th className="table-data__head-title table-data__head-title--big">
            Data
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
          return (
            <tr key={dados.idEvento} className="table-data__head-row">
              <td className="table-data__data table-data__data--big">
                {dados.nomeEvento}
              </td>
              <td className="table-data__data table-data__data--big">
                <p
                  className="event-card__description"
                  data-tooltip-id={dados.idEvento}
                  data-tooltip-content={dados.descricao}
                  data-tooltip-place="top"
                >
                  <Tooltip id={dados.idEvento} className="custom-tootip" />
                  {dados.descricao.substr(0, 16)}...
                </p>
              </td>
              <td className="table-data__data table-data__data--big">
                {dados.tiposEvento.titulo}
              </td>
              <td className="table-data__data table-data__data--big">
                {dateFormatDbToView(dados.dataEvento)}
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={editPen}
                  alt=""
                  onClick={() => {
                    fnUpdate(dados.idEvento);
                  }}
                />
              </td>

              <td className="table-data__data table-data__data--little">
                <img
                  className="table-data__icon"
                  src={trashDelete}
                  alt=""
                  onClick={() => {
                    fnDelete(dados.idEvento);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableEv;
