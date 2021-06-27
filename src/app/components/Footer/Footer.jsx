import { isMobile } from 'react-device-detect';
import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';

import logo from '../../assets/images/logo.png';
import './Footer.css';

export default function Footer() {
  return (
    <footer>
      <div className="info">
        {!isMobile && <img src={logo} width="80" />}
        <span>
          © Copyright 2021 - Buscabelo
          {!isMobile && <p>
            Avenida Senador Salgado Filho, 1559, Tirol, Natal-RN | CEP: 59015-000
            <br />
            CNPJ: 10.877.412/0010-59
          </p>}
        </span>
      </div>
      <div className="social">
        <FaFacebookF />
        <FaInstagram />
        <MdEmail />
      </div>
    </footer>
  )
}
