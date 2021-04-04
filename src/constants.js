const createEmptyTable = () => {
  const emptyTable = [];

  for (let i = 0; i < 8; i++) {
    const emptyRow = [];
    for (let j = 1; j < 25; j++) {
      if (i === 0) {
        emptyRow.push(j);
      } else {
        emptyRow.push(null);
      }
    }
    emptyTable.push(emptyRow);
  }
  return emptyTable;
};

const ARRAY_STRUCTURE_TABLE = createEmptyTable();
const DAYS = [
    null,
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export { DAYS, ARRAY_STRUCTURE_TABLE };
