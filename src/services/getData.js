// const DAYS = [
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
//   "Sunday",
// ];

const setHours = () => {
  const arrayHours = new Array(24);
  for (let i = 0; i < arrayHours.length; i++) {
    arrayHours[i] = true;
  }
  return arrayHours;
};
const dayData = setHours();

const defaultData = {
  Monday: dayData,
  Tuesday: dayData,
  Wednesday: dayData,
  Thursday: dayData,
  Friday: dayData,
  Saturday: dayData,
  Sunday: dayData,
};

export default defaultData;
