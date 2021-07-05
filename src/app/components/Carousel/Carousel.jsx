import { isMobile } from 'react-device-detect';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";

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
    }
  } else {
    carouselOptions = {
      ...carouselOptions,
      autoPlay: false,
      showIndicators: false,
      centerMode: true,
      centerSlidePercentage: 20
    }
  }

  return (
    <Carousel
      {...carouselOptions}
      className={!isMobile ? 'desktop' : ''}
    >
      <a href="/">
        <img src="https://picsum.photos/600/250" alt="slide 01" />
      </a>
      <a href="/">
        <img src="https://picsum.photos/600/250" alt="slide 02" />
      </a>
      <a href="/">
        <img src="https://picsum.photos/600/250" alt="slide 02" />
      </a>
    </Carousel>
  )
}
