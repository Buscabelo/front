import { MdStar } from 'react-icons/md';

import './Service.css';

export default function Service({ data }) {
  return (
    <div className="service-container">
      {data.avatar && <img src={data.avatar} className="service-icon" alt={data.name} />}
      <div className="service-body">
        <div className="service-content">
          <h3 className="service-title">
            <a href={`/${data.password ? 'estabelecimento' : 'servico'}/${data.id}`}>
              {data.name}
            </a>
          </h3>
          <p className="service-description">
            {data.description}
          </p>
        </div>
        {data.rating_average && <small className="service-rate">
          <MdStar /> {data.rating_average}
        </small>}
      </div>
    </div>
  );
}
