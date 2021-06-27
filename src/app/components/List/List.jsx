import './List.css';

export default function List({ direction = 'horizontal', items, ItemComponent = null, itemsPerLine }) {
  let type, width;

  if (direction === 'horizontal') {
    type = 'grid';
    width = (100 / +itemsPerLine) - 5;
    console.log(width)
  } else if (direction === 'vertical') {
    type = 'list'
  }

  return (
    <ol className={`list-container ${type}`}>
      {items.map(item => (
        <li style={{width: `${width}vw`}}>
          {ItemComponent && <ItemComponent data={item} />}
        </li>
      ))}
    </ol>
  )
}
