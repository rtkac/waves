import React, { Component } from 'react';
import UserLayout from '../../HOC/UserLayout';

import { fretsOptions } from '../../../constants/fixedCategories';
import { update, generateData, isFormValid, populateOptionFields, resetFields } from '../../utils/Form/formActions';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import CircularProgress from '@material-ui/core/CircularProgress';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FormField from '../../utils/Form/FormField';
import MyButton from '../../utils/MyButton';

import { connect } from 'react-redux';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../actions/productsActions';

class AddProduct extends Component {
  constructor(props) {
    super(props);

    this.submitForm = this.submitForm.bind(this);
    this.updateForm = this.updateForm.bind(this);

    this.state = {
      formError: false,
      formSuccess: false,
      loading: false,
      formdata: {
        name: {
          element: 'input',
          name: 'Name',
          value: '',
          config: {
            name: "name_input",
            type: 'text',
            label: 'Product name'
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        description: {
          element: 'textarea',
          name: 'Description',
          value: '',
          config: {
            name: "description_input",
            type: 'text',
            label: 'Product description'
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        price: {
          element: 'input',
          name: 'Price',
          value: '',
          config: {
            name: "price_input",
            type: 'number',
            label: 'Product price'
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        brand: {
          element: 'select',
          name: 'Brand',
          value: '',
          config: {
            name: "brand_input",
            label: 'Product brand',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        shipping: {
          element: 'select',
          name: 'Shipping',
          value: '',
          config: {
            name: "shipping_input",
            label: 'Product shipping',
            options: [
              {
                key: true,
                value: 'Yes'
              },
              {
                key: false,
                value: 'No'
              }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        available: {
          element: 'select',
          name: 'Available',
          value: '',
          config: {
            name: "available_input",
            label: 'Available, in stock',
            options: [
              {
                key: true,
                value: 'Yes'
              },
              {
                key: false,
                value: 'No'
              }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        wood: {
          element: 'select',
          name: 'Wood',
          value: '',
          config: {
            name: "wood_input",
            label: 'Wood material',
            options: []
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        frets: {
          element: 'select',
          name: 'Frets',
          value: '',
          config: {
            name: "frets_input",
            label: 'Frets',
            options: fretsOptions
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
        publish: {
          element: 'select',
          name: 'Publish',
          value: '',
          config: {
            name: "publish_input",
            label: 'Publish',
            options: [
              {
                key: true,
                value: 'Public'
              },
              {
                key: false,
                value: 'Hidden'
              }
            ]
          },
          validation: {
            required: true
          },
          valid: false,
          validForm: true,
          touched: false,
          validationMessage: ''
        },
      }
    }
  }

  componentDidMount() {
    const _this = this;
    const formdata = this.state.formdata;

    async function waitForBrands() {
      let response = _this.props.dispatch(await getBrands());
      populateOptionFields(formdata, response.payload, 'brand')
    }
    waitForBrands();

    async function waitForWoods() {
      let response = _this.props.dispatch(await getWoods());
      populateOptionFields(formdata, response.payload, 'wood')
    }
    waitForWoods();
  }

  updateForm = (element) => {
    const newFormdata = update(element, this.state.formdata, 'products');

    this.setState({
      formdata: newFormdata,
      formError: false
    });
  }

  submitForm = (event) => {
    event.preventDefault();

    let dataToSubmit = generateData(this.state.formdata, 'products');
    let formIsValid = isFormValid(this.state.formdata, 'products');

    if(formIsValid) {
      
      const _this = this;

      this.setState({
        loading: true
      });
      
      async function waitForAddProduct() {
        let response = _this.props.dispatch(await addProduct(dataToSubmit));
        if(response.payload.success) {

          const newFormdata = resetFields(_this.state.formdata, 'products');

          _this.setState({
            formdata: newFormdata,
            loading: false,
            formSuccess: true
          }, () => {
            async function waitForTimeout() {
              _this.props.dispatch(await clearProduct())
            }
            waitForTimeout();
          });
          
        } else {
          _this.setState({
            loading: false,
            formError: true
          });    
        }
      }
      waitForAddProduct();

    } else {
      this.setState({
        formError: true
      });
    }
  }

  handleClose = () => {
    this.setState({
      formSuccess: false
    });
  };

  render() {
    return (
      <UserLayout>
        <h1>Add Product</h1>
        <form onSubmit={this.submitForm}>
          {Object.keys(this.state.formdata).map((item, index) => (
            <FormField
              key={`form-add-product-${index + 1}`}
              id={item}
              formdata={this.state.formdata[item]}
              change={this.updateForm}
              addStyles={{width: '100%'}}
            />
          ))}
          {this.state.formError && (
            <div className="error_label">Please check your data</div>
          )}
          <MyButton
            submit={(event) => this.submitForm(event)}
            type="submit"
            variant="contained"
            size="large"
            disabled={this.state.loading ? true : false}
            title={
              this.state.loading ? (
                <CircularProgress
                  className="btn-loading--large"
                />
              ) : 'ADD PRODUCT'
            }
            addStyles={{
              margin: '30px 0 0 0',
              backgroundColor: '#e1ddc3'
            }}
          />
        </form>
        <Dialog aria-labelledby="customized-dialog-title" open={this.state.formSuccess} onClose={this.handleClose}>
          <MuiDialogTitle id="customized-dialog-title">
            <span style={{display: 'flex', justifyContent: 'space-between'}}>
              Product add
              <FontAwesomeIcon icon="times-circle" className="icon" onClick={this.handleClose} style={{cursor: 'pointer'}} />
            </span>
          </MuiDialogTitle>
          <MuiDialogContent>
            New product has been successfully added
          </MuiDialogContent>
        </Dialog>
      </UserLayout>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}

export default connect(mapStateToProps)(AddProduct);