import { StrictMode } from 'react';
import { render } from 'react-dom';

import './index.css';
import Ui from './ui/routes';
// import reportWebVitals from './reportWebVitals';

render(
  <StrictMode>
    <Ui />
  </StrictMode>,
  document.getElementById('root')
);

// To measure performance, uncomment function and import. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
