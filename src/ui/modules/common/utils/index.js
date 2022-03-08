import { ReactComponent as HaircutIcon } from '../../../assets/images/icons/haircut.svg';
import { ReactComponent as BeautyIcon } from '../../../assets/images/icons/beauty.svg';
import { ReactComponent as BeardIcon } from '../../../assets/images/icons/beard.svg';

export function getEdgeElements(array) {
  if (!Array.isArray(array)) {
    throw new Error('You need to pass an array');
  }

  const _array = [...array];
  const [first,] = _array;
  const last = _array.pop();

  return [first, last];
}

export function getCategoryIcon(category) {
  if (category === 'Corte')
    return <HaircutIcon />;

  if (category === 'Tratamento')
    return <BeautyIcon />;

  if (category === 'Barba')
    return <BeardIcon />;
}
