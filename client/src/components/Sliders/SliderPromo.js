import React from 'react';
import Slider from 'react-slick';
import MyButton from '../utils/MyButton';

const SliderPromo = (props) => {

  const slides = [
    {
      img: '/images/promo/promo-1.jpg',
      lineOne: 'Fender',
      lineTwo: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/guitars'
    },
    {
      img: '/images/promo/promo-2.jpg',
      lineOne: 'B-Stock',
      lineTwo: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/guitars'
    }
  ]

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  }

  const generateSlides = () => (
    slides ? (
      slides.map((item, i) => (
        <div key={i}>
          <div
            className="featured_image"
            style={{
              background: `url(${item.img})`,
              height: `${window.innerHeight - 85}px`
            }}
          >
            <div className="featured_action">
              <div className="tag title">{item.lineOne}</div>
              <div className="tag low_title">{item.lineTwo}</div>
              <div>
                <MyButton
                  type="link"
                  variant="contained"
                  size="large"
                  to={item.linkTo}
                  title={item.linkTitle}
                  addStyles={{
                    margin: '10px 0 0 0',
                    backgroundColor: '#e1ddc3',
                    borderRadius: '0'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      ))
    ) : (
      null
    )
  )

  return (
    <div className="featured_container">
      <Slider {...settings}>
        {generateSlides()}
      </Slider>
    </div>
  )
}

export default SliderPromo;