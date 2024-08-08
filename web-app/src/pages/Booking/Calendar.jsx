import React, { useState } from 'react';
import styles from './BookingPage.module.css';

const Calendar = () => {
  const [weekdays] = useState(['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']);
  const [months] = useState(['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December']);
  const [dayToday, setDayToday] = useState({ currentDay: new Date() });

  const CalendarDays = (props) => {
    let firstDayOfMonth = new Date(props.day.getFullYear(), props.day.getMonth(), 1);
    let weekdayOfFirstDay = firstDayOfMonth.getDay();
    let currentDays = [];

    for (let day = 0; day < 42; day++) {
      if (day === 0 && weekdayOfFirstDay === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() - 7);
      } else if (day === 0) {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + (day - weekdayOfFirstDay));
      } else {
        firstDayOfMonth.setDate(firstDayOfMonth.getDate() + 1);
      }

      let calendarDay = {
        currentMonth: (firstDayOfMonth.getMonth() === props.day.getMonth()),
        date: (new Date(firstDayOfMonth)),
        month: firstDayOfMonth.getMonth(),
        number: firstDayOfMonth.getDate(),
        selected: (firstDayOfMonth.toDateString() === props.day.toDateString()),
        year: firstDayOfMonth.getFullYear()
      }

      currentDays.push(calendarDay);
    }

    return (
      <div className={styles.tableContent}>
        {
          currentDays.map((day, index) => (
            <div
              key={index}
              className={`${styles.calendarDay} ${day.currentMonth ? styles.current : styles.nonCurrent} ${day.selected ? styles.selected : ''}`}
              onClick={() => props.changeCurrentDay(day)}
            >
              <p>{day.number}</p>
            </div>
          ))
        }
      </div>
    )
  }

  const changeCurrentDay = (day) => {
    setDayToday({ currentDay: new Date(day.year, day.month, day.number) });
  }

  return (
    <div className={styles.calendar}>
      <div className={styles.calendarHeader}>
        <h2>{months[dayToday.currentDay.getMonth()]} {dayToday.currentDay.getFullYear()}</h2>
      </div>
      <div className={styles.calendarBody}>
        <div className={styles.tableHeader}>
          {
            weekdays.map((weekday, index) => (
              <div key={index} className={styles.weekday}><p>{weekday}</p></div>
            ))
          }
        </div>
        <CalendarDays day={dayToday.currentDay} changeCurrentDay={changeCurrentDay} />
      </div>
    </div>
  )
}

export default Calendar;
