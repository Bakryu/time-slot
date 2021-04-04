import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import Table from "../Table";
import defaultData from "../../services/getData";
import "./app.css";

function App() {
  const [tableData, setTableData] = useState(defaultData);

  const toggleCell = (row, column) => {
    setTableData((prevState) => {
      const currentRow = [...prevState[row]];
      currentRow[column] = !currentRow[column];
      // console.log(currentRow);
      return { ...prevState, [row]: currentRow };
    });
  };
  // console.log(tableData);
  return (
    <div className="App">
      <Table tableData={tableData} toggleCell={toggleCell} />
      <Button variant="primary">Primary</Button>
    </div>
  );
}

export default App;
