import { useEffect, useState } from 'react';
import { differenceInDays, eachDayOfInterval, format, isSameDay, isSameMonth, isSaturday, isSunday, nextSaturday, nextSunday, previousSunday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import clsx from 'clsx';

import './styles.css';
import { getEdgeElements } from '../../../common/utils';

const getInterval = base => eachDayOfInterval({
  start: isSunday(base) ? base : previousSunday(base),
  end: isSaturday(base) ? base : nextSaturday(base)
});

const firstIndex = 0;
const minDays = 0;

export default function Calendar({ selectedDate, onSelect }) {
  const today = new Date();
  const [baseDate, setBaseDate] = useState(selectedDate || today);
  const [intervalDates, setIntervalDates] = useState(getInterval(baseDate));
  const [dates, setDates] = useState(getEdgeElements(intervalDates));

  useEffect(() => {
    setIntervalDates(getInterval(baseDate));
  }, [baseDate]);

  useEffect(() => {
    setDates(getEdgeElements(intervalDates));
  }, [intervalDates]);

  const handleSelect = date => {
    if (isSameDay(date, selectedDate)) {
      onSelect(null);
    } else if (differenceInDays(date, today) >= minDays) {
      onSelect(date);
    }
  };

  const handleChangeInterval = direction => {
    const [firstDate, lastDate] = dates;

    if (direction === 'left') {
      setBaseDate(previousSunday(firstDate));
    } else if (direction === 'right') {
      setBaseDate(nextSunday(lastDate));
    }
  };

  const renderMonth = () => {
    const [firstDate, lastDate] = dates;

    if (isSameMonth(firstDate, lastDate)) {
      return format(baseDate, 'MMMM Y', { locale: ptBR });
    }

    return (
      <>
        {format(firstDate, 'MMMM', { locale: ptBR })} - {format(lastDate, 'MMMM Y', { locale: ptBR })}
      </>
    );
  };

  return (
    <div className="calendar-container">
      <header>
        <button type="button" disabled={differenceInDays(dates[firstIndex], today) < minDays} onClick={() => handleChangeInterval('left')}>
          <MdChevronLeft />
        </button>
        {renderMonth()}
        <button type="button" onClick={() => handleChangeInterval('right')}>
          <MdChevronRight />
        </button>
      </header>
      <main>
        <table>
          <thead>
            <tr>
              <th>
                Dom
              </th>
              <th>
                Seg
              </th>
              <th>
                Ter
              </th>
              <th>
                Qua
              </th>
              <th>
                Qui
              </th>
              <th>
                Sex
              </th>
              <th>
                Sab
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {intervalDates.map(x => <td
                key={x}
                className={clsx({'active': isSameDay(x, selectedDate), 'today': isSameDay(x, today), 'disabled': differenceInDays(x, today) < minDays })}
                onClick={() => handleSelect(x)}
              >
                {format(x, 'dd')}
              </td>)}
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
}
