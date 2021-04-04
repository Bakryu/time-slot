import React from "react";
import { DAYS, ARRAY_STRUCTURE_TABLE } from "../../constants";
import "./table.css";

export default function Table({ tableData, toggleCell }) {
  const createTable = () => {
    const dataTable = [];
    for (let i = 0; i < ARRAY_STRUCTURE_TABLE.length; i++) {
      const item = ARRAY_STRUCTURE_TABLE[i];
      const row = [];
      for (let j = 0; j < item.length; j++) {
        const rowItem = item[j];
        const id = j + 1 + DAYS[i];
        if (rowItem) {
          row.push(
            <div className="cellColumTable" key={id} id={id}>
              {rowItem}
            </div>
          );
        } else {
          const isFree = tableData[DAYS[i]][j];
          row.push(
            <div
              className={`cellItemTable ${isFree ? `white` : `red`}`}
              day={DAYS[i]}
              orderrow={i}
              ordercell={j + 1}
              key={id}
              id={id}
              onClick={() => toggleCell(DAYS[i], j)}
            >
              {rowItem}
            </div>
          );
        }
      }
      dataTable.push(
        <div className="rowTable" key={DAYS[i]}>
          {row}
        </div>
      );
    }
    return <div className="table">{dataTable}</div>;
  };

  return createTable();
}
