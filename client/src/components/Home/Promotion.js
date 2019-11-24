import React from 'react';
import MyButton from '../utils/MyButton';

const Promotion = (props) => {

  const promotion = {
    img: '/images/promo/promo-3.jpg',
    lineOne: 'Up to 40% off',
    lineTwo: 'In second hand guitars',
    linkTitle: 'Shop now',
    linkTo: '/guitars'
  }

  const renderPromotion = () => (
    promotion ? (
      <div
        className="home_promotion_img"
        style={{
          background: `url(${promotion.img})`
        }}
      >
        <div className="tag title">{promotion.lineOne}</div>
        <div className="tag low_title">{promotion.lineTwo}</div>
        <div style={{textAlign: 'center'}}>
          <MyButton
            type="link"
            variant="outlined"
            size="large"
            to={promotion.linkTo}
            title={promotion.linkTitle}
            addStyles={{
              margin: '10px 0 0 0',
              backgroundColor: '#e1ddc3',
              borderRadius: '0'
            }}
          />
        </div>
      </div>
    ) : (
      null
    )
  )

  return (
    <div className="home_promotion">
      {renderPromotion()}
    </div>
  )
}

export default Promotion;