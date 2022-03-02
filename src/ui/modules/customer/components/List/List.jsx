import './List.css';

const defaultLineCount = 1;
const inicialItems = 0;

export default function List({ direction = 'horizontal', items, ItemComponent = null, itemsPerLine = defaultLineCount, itemsMaxPerLine = null}) {
  let type = 'grid';

  if (direction === 'horizontal') {
    type = 'grid';
  } else if (direction === 'vertical') {
    type = 'list';
  }

  if (!items || Array.isArray(items) && !items.length) {
    return null;
  }

  return (
    <ol className={`list-container ${type}`} style={{'--grid-num-rows': itemsPerLine}}>
      {itemsMaxPerLine
        ?items.slice(inicialItems, itemsMaxPerLine).map(item => (
          <li key={item.id}>
            {ItemComponent && <ItemComponent data={item} />}
          </li>
        ))
        :items.map(item => (
          <li key={item.id}>
            {ItemComponent && <ItemComponent data={item} />}
          </li>
        ))}
    </ol>
  );
}