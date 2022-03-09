import { isMobile } from 'react-device-detect';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import primeBarberAd from '../../../../assets/images/slides/Barbearia do Prime.png';
import figaroBarberAd from '../../../../assets/images/slides/Figaro Barbers.png';
import belleDeJourAd from '../../../../assets/images/slides/Espaço Belle de Jour.png';
import './Carousel.css';

export default function CustomCarousel() {
  let carouselOptions = {
    showArrows: false,
    showStatus: false,
    showThumbs: false,
  };

  if (isMobile) {
    carouselOptions = {
      ...carouselOptions,
      infiniteLoop: true,
      showIndicators: true,
      stopOnHover: false,
    };
  } else {
    carouselOptions = {
      ...carouselOptions,
      autoPlay: false,
      showIndicators: false,
      centerMode: true,
      centerSlidePercentage: 20
    };
  }

  return (
    <Carousel
      {...carouselOptions}
      className={!isMobile ? 'desktop' : ''}
    >
      <a href="/">
        <img src={primeBarberAd} alt="Barbearia do Prime" />
      </a>
      <a href="/">
        <img src={figaroBarberAd} alt="Fígaro Barbers" />
      </a>
      <a href="/">
        <img src={belleDeJourAd} alt="Espaço Belle de Jour" />
      </a>
    </Carousel>
  );
}
