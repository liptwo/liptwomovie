import React, { useContext, useEffect, useState } from 'react'
import rating from '../assets/rating.png'
import rating_half from '../assets/rating-half.png'
import temp from '../assets/temp-1.png'
import iconPlay from   '../assets/play-button.png'
import { MovieContext } from '../context/MovieProvider'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import BannerEach from './BannerEach'

const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 1
    },
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1200, min: 600 },
      items: 1
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1
    }
  };

const ArrayBanner = [
    ['the garden of word','thegardenofword'],
    ['spirited away','spiritedaway'],
    ['totoro','totoro'],
];
const Banner = () => {
  return (
    <Carousel responsive={responsive}   swipeable={false}
    draggable={false}
    showDots={true}
    ssr={true} // means to render carousel on server-side.
    slidesToSlide={1}
    infinite={false}
    // autoPlay={true}
    autoPlaySpeed={1000}
    keyBoardControl={true}
    customTransition='transform 400ms ease-in-out'
    transitionDuration={1000}
    containerClass='carousel-container'
    removeArrowOnDeviceType={['tablet', 'mobile']}
    dotListClass='custom-dot-list-style'
    itemClass='carousel-item-padding-40-px'
  >
            {ArrayBanner.map((item) => (<BannerEach movie={{item}} />))}
    </Carousel>
  )
}

export default Banner
