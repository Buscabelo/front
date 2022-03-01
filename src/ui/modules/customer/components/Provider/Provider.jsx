import { MdStar } from 'react-icons/md';

import './Provider.css';

export default function Provider({ data }) {
  return (
    <a className='link-provider' href={`/estabelecimento/${data.id}`}>
      <div className="provider-container">
        <img src="https://picsum.photos/270/165" className='provider-banner' alt={data.name} />
        {/* {data.avatar && <img src={data.avatar} className='provider-banner' alt={data.name} />} */}
        <div className="provider-body">
          <h2 className="body-title">{data.name}
          </h2>
          <div className="body-content">
            {true && <p><MdStar /> 4.0</p>} - {true && <p>Av. Salgado Filho, 1982</p>}
          </div>
          <p className="body-description">
            Descrição testando um testo um pouco maior sobre o estabelecimento
            {data.description}
          </p>
        </div>
      </div>
    </a>
  );
}