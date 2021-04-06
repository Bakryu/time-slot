import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Table from "../Table";
import defaultData from "../../services/getData";
import "./app.css";

function App() {
  const [tableData, setTableData] = useState(defaultData);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startPoints, setStartPoints] = useState({
    day: null,
    hour: null,
    isFree: true,
  });

  const changeTableData = (currentDay, currentHour) => {
    const { day, hour, isFree } = startPoints;
    let startDay = day <= currentDay ? day : currentDay;
    const endDay = day >= currentDay ? day : currentDay;
    // console.log(startDay, endDay);
    let startHour = hour <= currentHour ? hour : currentHour;
    const endHour = hour >= currentHour ? hour : currentHour;
    let dayCount = 0;

    const newTableData = { ...tableData };
    let count = 0;
    for (const key in newTableData) {
      // console.log(startDay <= count && endDay >= count, "thet");
      if (startDay <= count && endDay >= count) {
        for (startHour; startHour <= endHour; startHour++) {
          console.log(
            startDay + "sd",
            endDay + "ed",
            startHour + "sh",
            endHour + "eh",
            count
          );
          newTableData[key][startHour] = isFree;
          console.log(key);
        }
      }
      ++count;
    }

    setTableData(newTableData);
  };

  const toggleCell = (row, column) => {
    setTableData((prevState) => {
      const currentRow = [...prevState[row]];
      currentRow[column] = !currentRow[column];
      return { ...prevState, [row]: currentRow };
    });
  };
  // console.log(controlPoints, isMouseDown);
  return (
    <div className="App">
      <Table
        tableData={tableData}
        toggleCell={toggleCell}
        isMouseDown={isMouseDown}
        setIsMouseDown={setIsMouseDown}
        startPoints={startPoints}
        setStartPoints={setStartPoints}
        changeTableData={changeTableData}
      />
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default App;
