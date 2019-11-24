import React, { Component } from 'react';
import SliderPromo from '../Sliders/SliderPromo';
import Promotion from './Promotion';
import CardBlock from '../utils/CardBlock';

import { connect } from 'react-redux';
import {
  getProductsBySell,
  getProductsByArrival
} from '../../actions/productsActions';

class Home extends Component {

  componentDidMount() {
    const _this = this;

    async function asyncGetProductsBySell() {
      return _this.props.dispatch(await getProductsBySell());
    }
    asyncGetProductsBySell();

    async function asyncGetProductsByArrival() {
      return _this.props.dispatch(await getProductsByArrival());
    }
    asyncGetProductsByArrival();
  }

  render() {
    return (
      <div>
        <SliderPromo />
        <Promotion />
        <CardBlock
          title="Best selling products"
          list={this.props.products.bySell}
        />
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Home);