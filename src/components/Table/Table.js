import React from "react";
import { DAYS, ARRAY_STRUCTURE_TABLE } from "../../constants";
import "./table.css";

export default function Table({
  tableData,
  isMouseDown,
  setIsMouseDown,
  startPoints,
  setStartPoints,
  changeTableData,
}) {
  const createTable = () => {
    const dataTable = [];
    for (let day = 0; day < ARRAY_STRUCTURE_TABLE.length; day++) {
      const item = ARRAY_STRUCTURE_TABLE[day];
      const row = [];
      for (let hour = 0; hour < item.length; hour++) {
        const rowItem = item[hour];
        const id = hour + 1 + DAYS[day];
        if (rowItem) {
          row.push(
            <div className="cellColumTable" key={id}>
              {rowItem}
            </div>
          );
        } else {
          const isFree = tableData[DAYS[day]][hour];
          row.push(
            <div
              className={`cellItemTable ${isFree ? `white` : `red`}`}
              key={id}
              onMouseDown={() => {
                setIsMouseDown((prevState) => !prevState);
                setStartPoints({
                  day,
                  hour,
                  isFree: !isFree,
                });
              }}
              onMouseUp={() => {
                setIsMouseDown((prevState) => !prevState);
                setStartPoints({
                  day: null,
                  hour: null,
                  isFree: true,
                });
              }}
              onMouseEnter={() => {
                if (isMouseDown) {
                  changeTableData(day, hour);
                }
              }}
            >
              {rowItem}
            </div>
          );
        }
      }
      dataTable.push(
        <div className="rowTable" key={DAYS[day]}>
          {row}
        </div>
      );
    }
    return <div className="table">{dataTable}</div>;
  };

  return createTable();
}
