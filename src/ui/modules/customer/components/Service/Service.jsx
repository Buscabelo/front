import { MdStar } from 'react-icons/md';

import './Service.css';

export default function Service({ data }) {
  return (
    <div className="service-container">
      <img src="https://picsum.photos/270/165" className='service-banner' alt={data.name} />
      {/* {data.avatar && <img src={data.avatar} className='service-banner' alt={data.name} />} */}
      <div className="service-body">
        <div className="service-content">
          <h2 className="service-title">
            <a href={`/${data.provider ? 'servico' : 'estabelecimento'}/${data.id}`}>
              {data.name}
            </a>
          </h2>
          <p className="service-description">
            {data.description}
          </p>
        </div>
        <div className='service-footer'>
          {data.rating_average  && <p className="service-rate">
            <MdStar /> 4.0
          </p>}
          <p className='price'>{data.value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'})}</p>
        </div>
      </div>
    </div>
  );
}
