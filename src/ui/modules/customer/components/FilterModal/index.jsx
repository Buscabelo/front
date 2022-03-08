import { useContext, useState } from 'react';
import { MdClose } from 'react-icons/md';
import Modal from 'react-modal';
import clsx from 'clsx';

import './styles.css';
import RangeSlider from '../RangeSlider';
import { getCategoryIcon } from '../../../common/utils/index';
import { AppContext } from '../../../common/context/AppContext';

const minPrice = 0;
const maxPrice = 1000;

export default function FilterModal({ show, onHide, changeMinPrice, changeMaxPrice, changeServiceType }) {
  const [serviceType, setServiceType] = useState(null);
  const [minValue, setMinValue] = useState(null);
  const [maxValue, setMaxValue] = useState(null);
  const { categories } = useContext(AppContext);

  const handleFilter = () => {
    changeServiceType(serviceType);
    changeMinPrice(minValue);
    changeMaxPrice(maxValue);
    onHide();
  };

  const handleTypeChange = value => {
    if (serviceType !== value) {
      setServiceType(value);
    } else {
      setServiceType(null);
    }
  };

  const handlePriceChange = ({ min, max }) => {
    setMinValue(min > minPrice ? min : null);
    setMaxValue(max < maxPrice ? max : null);
  };

  Modal.setAppElement('#root');

  return (
    <Modal
      isOpen={show}
      className="filter-modal"
      overlayClassName="filter-modal-overlay"
    >
      <header>
        <h2>Filtros</h2>
        <button type="button" onClick={() => onHide()}>
          <MdClose />
        </button>
      </header>
      <main>
        <section className="service-types">
          <h3>Categorias</h3>
          <ol>
            {categories.map(category => <li key={category}>
              <a className={clsx({ 'active': serviceType === category })} onClick={() => handleTypeChange(category)}>
                {getCategoryIcon(category)}
                <h3>{category}</h3>
              </a>
            </li>)}
          </ol>
        </section>
        <section>
          <h3>Preço</h3>
          <RangeSlider min={minPrice} minVal={minValue} max={maxPrice} maxVal={maxValue} onChange={handlePriceChange} />
        </section>
      </main>
      <footer>
        <button type="button" onClick={() => handleFilter()}>Filtrar</button>
      </footer>
    </Modal>
  );
}
