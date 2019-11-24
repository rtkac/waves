import React, { Component } from 'react';
import MyButton from './MyButton';

class Card extends Component {

  renderCardImage = (images) => {
    if(images.length > 0) {
      return images[0].url
    } else {
      return '/images/no-product.png'
    }
  }

  render() {
    return (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div
          className={this.props.images.length > 0 ? "image" : "image no-image"}
          style={{
            background: `url(${this.renderCardImage(this.props.images)}) no-repeat`
          }}
        ></div>
        <div className="action_container">
          <div className="tags">
            <div className="brand">{this.props.brand ? this.props.brand.name : ''}</div>
            <div className="name">{this.props.name}</div>
            <div className="price">{this.props.price} &euro;</div>
          </div>
          {
            this.props.grid ? (
              <div className="description">
                {this.props.description}
              </div>
            ) : (
              null
            )
          }
          <div className="actions">
            <div className="button_wrap">
              <MyButton
                type="link"
                to={`/guitars/${this.props._id}`}
                title="View product"
                variant="contained"
                size="small"
                addStyles={{
                  padding: '6px 15px',
                  marginRight: '15px',
                  backgroundColor: '#e1ddc3',
                  borderRadius: '0'
                }}
              />
            </div>
            <div className="button_wrap">
              <MyButton
                type="cart_small"
                variant="contained"
                size="small"
                runAction={() => {
                  console.log('added to cart');
                }}
                addStyles={{
                  padding: '10px 15px',
                  backgroundColor: '#e1ddc3',
                  borderRadius: '0'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Card;