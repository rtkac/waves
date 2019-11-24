import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTop from '../utils/PageTop';
import LoadmoreCards from './LoadmoreCards';
import CollapseCheckbox from '../utils/Form/CollapseCheckbox';
import CollapseRadio from '../utils/Form/CollapseRadio';
import { frets, price } from '../../constants/fixedCategories';

import { connect } from 'react-redux';
import {
  getBrands,
  getWoods,
  getProductsToShop
} from '../../actions/productsActions';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      woods: [],
      price: []
    }
  }

  componentDidMount() {
    const _this = this;

    async function asyncGetBrands() {
      return _this.props.dispatch(await getBrands());
    }
    asyncGetBrands();

    async function asyncGetWoods() {
      return _this.props.dispatch(await getWoods());
    }
    asyncGetWoods();

    async function asyncGetProductsToShop() {
      return _this.props.dispatch(await getProductsToShop(
        _this.state.skip,
        _this.state.limit,
        _this.state.filters
      ));
    }
    asyncGetProductsToShop();
  }

  handleFilters = (filters, category) => {
    const newFilters = {...this.state.filters};
    newFilters[category] = filters;

    if(category === 'price') {
      for(let key in price) {
        if(price[key]._id === parseInt(filters, 10)) {
          newFilters[category] = price[key].array
        }
      }
    }

    this.showFilteredResults(newFilters);

    this.setState({
      filters: newFilters
    });
  }

  showFilteredResults = (filters) => {
    const _this = this;

    async function asyncGetProductsToShop() {
      return _this.props.dispatch(await getProductsToShop(
        0,
        _this.state.limit,
        filters
      ))
    }
    asyncGetProductsToShop()
      .then(() => {
        _this.setState({
          skip: 0
        })
      });
  }

  loadMore = () => {
    const _this = this;

    let skip = this.state.skip + this.state.limit;

    async function asyncGetProductsToShop() {
      return _this.props.dispatch(await getProductsToShop(
        skip,
        _this.state.limit,
        _this.state.filters,
        _this.props.products.toShop
      ))
    }
    asyncGetProductsToShop()
      .then(() => {
        _this.setState({
          skip
        })
      });
  }

  handleGrid = () => {
    this.setState({
      grid: !this.state.grid ? 'grid_bars' : ''
    });
  }

  render() {

    const products = this.props.products;

    return (
      <div>
        <PageTop
          title="Browse Products"
        />
        <div className="container">
          <div className="shop_wrapper">
            <div className="left">
              <CollapseCheckbox
                initState={true}
                title="Brands"
                list={products.brands}
                handleFilters={(filters) => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckbox
                initState={false}
                title="Frets"
                list={frets}
                handleFilters={(filters) => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckbox
                initState={false}
                title="Woods"
                list={products.woods}
                handleFilters={(filters) => this.handleFilters(filters, 'wood')}
              />
              <CollapseRadio
                initState={true}
                title="Price"
                list={price}
                handleFilters={(filters) => this.handleFilters(filters, 'price')}
              />
            </div>
            <div className="right">
              <div className="shop_options">
                <div className="shop_grids clear">
                  <div
                    className={`grid_btn ${this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon="bars" className="icon" />
                  </div>
                  <div
                    className={`grid_btn ${!this.state.grid ? '' : 'active'}`}
                    onClick={() => this.handleGrid()}
                  >
                    <FontAwesomeIcon icon="th" className="icon" />
                  </div>
                </div>
              </div>
              <div>
                <LoadmoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={products.toShopSize}
                  products={products.toShop}
                  loadMore={() => this.loadMore()}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(Shop);