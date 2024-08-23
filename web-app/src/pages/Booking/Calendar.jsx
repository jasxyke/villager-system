import React, { useState } from "react";
import styles from "./BookingPage.module.css";

const Calendar = () => {
  const [weekdays] = useState([
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  ]);
  const [months] = useState([
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]);
  const [dayToday, setDayToday] = useState({ currentDay: new Date() });

  /*const CalendarDays = (props) => {
    let firstDayOfMonth = new Date(
      props.day.getFullYear(),
      props.day.getMonth(),
      1
    );
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 35; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(
          firstDayOfMonth.getDate() + (day - weekdayOfFirstDay)
        );
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: firstDayOfMonth.getMonth() === props.day.getMonth(),
        date: new Date(firstDayOfMonth),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: firstDayOfMonth.toDateString() === props.day.toDateString(),
        year: firstDayOfMonth.getFullYear(),
      };

      currentDays.push(calendarDay);
    }

    return (
      <div className={styles.tableContent}>
        {currentDays.map((day, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${
              day.currentMonth ? styles.current : styles.nonCurrent
            } ${day.selected ? styles.selected : ""}`}
            onClick={() => props.changeCurrentDay(day)}
          >
            <p>{day.number}</p>
          </div>
        ))}
      </div>
    );
  };
  */

  const CalendarDays = (props) => {
    const { day, changeCurrentDay } = props;

    let firstDayOfMonth = new Date(day.getFullYear(), day.getMonth(), 1);

    let weekdayOfFirstDay = firstDayOfMonth.getDay();

    let daysToShowBefore = weekdayOfFirstDay;

    let daysInMonth = new Date(
      day.getFullYear(),
      day.getMonth() + 1,
      0
    ).getDate();

    let daysToShowAfter = (7 - ((daysInMonth + daysToShowBefore) % 7)) % 7;

    let currentDays = [];

    let prevMonthDate = new Date(
      day.getFullYear(),
      day.getMonth(),
      -daysToShowBefore + 1
    );
    for (let i = 0; i < daysToShowBefore; i++) {
      let calendarDay = {
        currentMonth: false,
        date: new Date(prevMonthDate),
        month: prevMonthDate.getMonth(),
        number: prevMonthDate.getDate(),
        selected: prevMonthDate.toDateString() === day.toDateString(),
        year: prevMonthDate.getFullYear(),
      };
      currentDays.push(calendarDay);
      prevMonthDate.setDate(prevMonthDate.getDate() + 1);
    }

    for (let dayNumber = 1; dayNumber <= daysInMonth; dayNumber++) {
      let calendarDay = {
        currentMonth: true,
        date: new Date(day.getFullYear(), day.getMonth(), dayNumber),
        month: day.getMonth(),
        number: dayNumber,
        selected:
          new Date(
            day.getFullYear(),
            day.getMonth(),
            dayNumber
          ).toDateString() === day.toDateString(),
        year: day.getFullYear(),
      };
      currentDays.push(calendarDay);
    }

    let nextMonthDate = new Date(day.getFullYear(), day.getMonth() + 1, 1);
    for (let i = 0; i < daysToShowAfter; i++) {
      let calendarDay = {
        currentMonth: false,
        date: new Date(nextMonthDate),
        month: nextMonthDate.getMonth(),
        number: nextMonthDate.getDate(),
        selected: nextMonthDate.toDateString() === day.toDateString(),
        year: nextMonthDate.getFullYear(),
      };
      currentDays.push(calendarDay);
      nextMonthDate.setDate(nextMonthDate.getDate() + 1);
    }

    return (
      <div className={styles.tableContent}>
        {currentDays.map((day, index) => (
          <div
            key={index}
            className={`${styles.calendarDay} ${
              day.currentMonth ? styles.current : styles.nonCurrent
            } ${day.selected ? styles.selected : ""}`}
            onClick={() => changeCurrentDay(day)}
          >
            <p>{day.number}</p>
          </div>
        ))}
      </div>
    );
  };

  const changeCurrentDay = (day) => {
    setDayToday({ currentDay: new Date(day.year, day.month, day.number) });
  };

  const goToNextMonth = () => {
    let newDate = new Date(
      dayToday.currentDay.getFullYear(),
      dayToday.currentDay.getMonth() + 1,
      1
    );
    setDayToday({ currentDay: newDate });
  };

  const goToPreviousMonth = () => {
    let newDate = new Date(
      dayToday.currentDay.getFullYear(),
      dayToday.currentDay.getMonth() - 1,
      1
    );
    setDayToday({ currentDay: newDate });
  };

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <button className={styles.navButton} onClick={goToPreviousMonth}>
          ◁
        </button>
        <h2>
          {months[dayToday.currentDay.getMonth()]}{" "}
          {dayToday.currentDay.getFullYear()}
        </h2>
        <button className={styles.navButton} onClick={goToNextMonth}>
          ▷
        </button>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.tableHeader}>
          {weekdays.map((weekday, index) => (
            <div key={index} className={styles.weekday}>
              <p>{weekday}</p>
            </div>
          ))}
        </div>
        <CalendarDays
          day={dayToday.currentDay}
          changeCurrentDay={changeCurrentDay}
        />
      </div>
    </div>
  );
};

export default Calendar;
