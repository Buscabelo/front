import './List.css';

export default function List({ direction = 'horizontal', items, ItemComponent = null, itemsPerLine }) {
  let type;

  if (direction === 'horizontal') {
    type = 'grid';
  } else if (direction === 'vertical') {
    type = 'list'
  }

  return (
    <ol className={`list-container ${type}`} style={{'--grid-num-rows': itemsPerLine}}>
      {items.map(item => (
        <li key={item.id}>
          {ItemComponent && <ItemComponent data={item} />}
        </li>
      ))}
    </ol>
  )
}
