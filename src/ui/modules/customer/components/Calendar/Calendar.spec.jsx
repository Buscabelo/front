import { render } from '@testing-library/react';
import { eachDayOfInterval, format, isSameMonth, isSaturday, isSunday, nextSaturday, previousSunday } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import { getEdgeElements } from '../../../common/utils';
import Calendar from '.';

describe('Teste do componente Calendar', () => {
  test('renderização sem quebrar', () => {
    const { getByText } = render(<Calendar />);
    const today = new Date();
    const [firstDate, lastDate] = getEdgeElements(eachDayOfInterval({
      start: isSunday(today) ? today : previousSunday(today),
      end: isSaturday(today) ? today : nextSaturday(today)
    }));
    let text = '';

    if (isSameMonth(firstDate, lastDate)) {
      text = format(today, 'MMMM Y', { locale: ptBR });
    } else {
      text = `${format(firstDate, 'MMMM', { locale: ptBR })} - ${format(lastDate, 'MMMM Y', { locale: ptBR })}`;
    }

    expect(getByText(text)).toBeInTheDocument();
  });

});
