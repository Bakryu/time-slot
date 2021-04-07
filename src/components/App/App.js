import React, { useState, useRef } from "react";
import Day from "../Day";
import { DATA } from "../../constants";
import NavBar from "../NavBar";

import "./app.css";

function App() {
  const [times, setTimes] = useState({});
  const [multipleChoice, setMultipleChoice] = useState(false);
  const [mouseDownValue, setMouseDownValue] = useState(null);
  const isChosenDay = useRef(null);

  const handleMouseDown = (item, time) => {
    setMultipleChoice(true);
    handleClickSetTimes(item.day, time);
    setMouseDownValue({ ...item, time });
    isChosenDay.current = times[item.day]?.includes(time);
  };

  const handleMouseUp = () => {
    setMultipleChoice(false);
    setMouseDownValue(null);
  };

  const handleClickSetTimes = (dayOfWeek, time) =>
    setTimes((state) => {
      if (state[dayOfWeek]?.includes(time)) {
        return {
          ...state,
          [dayOfWeek]: state[dayOfWeek].filter((item) => item !== time),
        };
      }

      if (state[dayOfWeek]) {
        return { ...state, [dayOfWeek]: [...state[dayOfWeek], time] };
      }

      return { ...state, [dayOfWeek]: [time] };
    });

  const handleMoveSetTimes = (item, time) => {
    const firstPoint = mouseDownValue;
    const secondPoint = { ...item, time };
    if (isChosenDay.current) {
      return setTimes((state) => resetTimes(state, firstPoint, secondPoint));
    }
    setTimes((state) => setTime(state, firstPoint, secondPoint));
  };

  return (
    <>
      <NavBar />
      <div className="container-fluid">
        <h1 className="py-3">Please select time slot</h1>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th
                scope="row"
                style={{ minWidth: "150px", maxWidth: "150px" }}
              ></th>
              {new Array(24).fill(1).map((item, ind) => {
                return (
                  <th
                    className="text-center"
                    key={ind}
                    style={{ minWidth: "41px", maxWidth: "41px" }}
                  >
                    {ind + 1}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {DATA.map((item) => {
              return (
                <tr key={item.day}>
                  <th
                    scope="row"
                    style={{ minWidth: "150px", maxWidth: "150px" }}
                  >
                    {item.day}
                  </th>
                  <Day
                    item={item}
                    times={times}
                    setMultipleChoice={setMultipleChoice}
                    multipleChoice={multipleChoice}
                    handleMoveSetTimes={handleMoveSetTimes}
                    handleMouseDown={handleMouseDown}
                    handleMouseUp={handleMouseUp}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;

function getCycleValues(firstPoint, secondPoint, field) {
  const firstLessTime = firstPoint[field] < secondPoint[field];
  let iter = firstLessTime ? firstPoint[field] : secondPoint[field];
  const maxValue = firstLessTime ? secondPoint[field] : firstPoint[field];

  return { iter, maxValue };
}

function getChosenHours(firstPoint, secondPoint) {
  const chosenHours = [];

  let { iter, maxValue } = getCycleValues(firstPoint, secondPoint, "time");

  for (; iter <= maxValue; iter++) {
    chosenHours.push(iter);
  }

  return chosenHours;
}

const setTime = (state, firstPoint, secondPoint) => {
  const updatedState = { ...state };
  const chosenHours = getChosenHours(firstPoint, secondPoint);

  let { iter, maxValue } = getCycleValues(firstPoint, secondPoint, "order");

  for (; iter <= maxValue; iter++) {
    if (updatedState[DATA[iter].day]) {
      updatedState[DATA[iter].day] = [
        ...new Set([...updatedState[DATA[iter].day], ...chosenHours]),
      ];
    } else {
      updatedState[DATA[iter].day] = chosenHours;
    }
  }

  return updatedState;
};

const resetTimes = (state, firstPoint, secondPoint) => {
  const updatedState = { ...state };
  const chosenHours = getChosenHours(firstPoint, secondPoint);

  let { iter, maxValue } = getCycleValues(firstPoint, secondPoint, "order");

  for (; iter <= maxValue; iter++) {
    if (updatedState[DATA[iter].day]) {
      const updatedDays = updatedState[DATA[iter].day]?.filter(
        (elem) => !chosenHours.includes(elem)
      );
      updatedState[DATA[iter].day] = updatedDays;
    }
  }

  return updatedState;
};
