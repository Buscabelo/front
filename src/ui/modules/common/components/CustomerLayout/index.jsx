import { isMobile, isTablet } from 'react-device-detect';

import Header from '../../../customer/components/Header/Header';
import FloatMenu from '../../../common/components/FloatMenu';
import './styles.css';

export default function CustomerLayout({ children }) {
  if (isMobile || isTablet) {
    return (
      <>
        <main className="wrapper">
          {children}
        </main>
        <FloatMenu />
      </>
    );
  }

  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  );
}
