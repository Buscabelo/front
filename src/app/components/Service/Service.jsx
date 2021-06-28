import { MdStar } from 'react-icons/md';

import './Service.css';

export default function Service({ data }) {
  return (
    <div className="service-container">
      <img src={data.icon} className="service-icon" alt={data.title} />
      <div className="service-body">
        <div className="service-content">
          <h3 className="service-title">
            <a href={data.link}>
              {data.title}
            </a>
          </h3>
          <p className="service-description">
            {data.description}
          </p>
        </div>
        <small className="service-rate">
          <MdStar /> {data.rating}
        </small>
      </div>
    </div>
  );
}
