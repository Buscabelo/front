import './List.css';

const defaultLineCount = 1;

export default function List({ direction = 'horizontal', items, ItemComponent = null, itemsPerLine = defaultLineCount }) {
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
      {items.map(item => (
        <li key={item.id}>
          {ItemComponent && <ItemComponent data={item} />}
        </li>
      ))}
    </ol>
  );
}
