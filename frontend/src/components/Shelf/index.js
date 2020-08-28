import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../Services/shelf/actions';
import { addProduct } from '../../Services/cart/actions';
import Product from './Product';
import ShelfHeader from './ShelfHeader';
import Clearfix from '../Clearfix';
import { DropdownList, Multiselect } from "react-widgets";
import { Button } from "reactstrap";
import baseUrl from "../Filter/url";
import urlToDefaultDisplay from "../Filter/urlForDefaultDisplay";
import './style.scss';
import "../Filter/dropdown.scss"
import { Container } from '@material-ui/core';

//List of all the available services.
const categoryList = [
   "Entertainment",
   "Caterer",
   "Venue" ,
   "Clothes" ,
   "Gifts" ,
];

//To sort services in ascending or descending order of their prices.
const priceList = [
  { id: "ASC", price: "Price: Low to High" },
  { id: "DESC", price: "Price: High to Low" },
];

//List of all the available locations.
const locationList = [
  "Mumbai",
  "Delhi",
  "Bangalore",
  "Goa",
  "Kolkata",
  "Chandigarh",
];

class Shelf extends Component {
  /**
   * @returns {void}
   */
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      priceValue: null,
      categoryValue: null,
      locationValue: null,
      minPrice: "",
      maxPrice: "",
    };
    this.handleInput = this.handleInput.bind(this);
  }

  /**
   * Mounts the component.
   * @returns {void}
   */
  componentDidMount() {
    const getProducts = `${baseUrl}api/service`;
    fetch(getProducts, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) => {
    this.setState({
        products: response,
      });
    });
  }

  /**
   * Takes minPrice and maxPrice as input.
   * @param {string} type field
   * @param {event} event  user input
   * @return {void}
   */
  handleInput(type, event) {
    this.setState({ [type]: event.target.value });
  }

  /**
   * Filters Products based on multiple criterias
   * @return {void}
   */
  filterProducts = () => {
    const { priceValue } = this.state;
    const { categoryValue } = this.state;
    const { locationValue } = this.state;
    const { minPrice } = this.state;
    const { maxPrice } = this.state;

    //the base URL for the filter API
    let url = `${baseUrl}api/service/query?`;

    //Constructing the URL from the user selected set of locations.
    if(locationValue){
      var sizeOfLocationArray;
      sizeOfLocationArray=locationValue.length;
      //if user selects some locations
      if (sizeOfLocationArray!==0) {
        url+='name=';
        url+=locationValue.join();
        url+='&';
        }
    }

    //Constructing the URL from the user selected set of services.
    if(categoryValue){
      var sizeOfCategoryArray;
      sizeOfCategoryArray=categoryValue.length;
      //if user selects some type of services
      if (sizeOfCategoryArray!==0) {
        //If user selects only one service
        url+='category=';
        url+=categoryValue.join();
        url+='&';
      }
    }
    
    //Appends ASC or DESC to the URL
    if (priceValue) {
      url = `${url}priceEstimate=${priceValue.id}&`;
    }
    //Append minimum price to the URL
    if (minPrice) {
      url = `${url}minPrice=${minPrice}&`;
    }
    //Append maximum price to the URL
    if (maxPrice) {
      url = `${url}maxPrice=${maxPrice}&`;
    }
    
    //Calling GET API to fetch the services
    fetch(url, {
      method: "GET",
      headers: {
      Accept: "application/json",
        "Content-Type": "application/json",
      },
    })
    .then((response) => response.json())
    .then((response) => {
    this.setState({
        //Storing the response received from server in a product list.
          products: response,
      });
    }); 
  };

  /**
   * On clicking the reset button it resets the filter values to null  
   * and dislay the services of all categories (default page)
   * @returns {void}
   */
  resetFilters = () => {
    //reseting the values of filter to null
    this.setState({
        priceyValue: null,
        categoryValue: [],
        locationValue: [],
    });
    //calling the get api to get the default page displayed
    fetch(urlToDefaultDisplay, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
    })
    .then((response) => response.json())
    .then((response) => {
        this.setState({
          products: response,
        });
    });
  };

  render() {
    const { products } = this.state;
    const { locationValue } = this.state;
    const { priceValue } = this.state;
    const { categoryValue } = this.state;
    const { minPrice } = this.state;
    const { maxPrice } = this.state;

    const p = products.map(p => {
      return (
        <Product product={p} addProduct={this.props.addProduct} key={p.id} />
      );
    });

    return (
      <Container  >
        <div className="conatiner">
          {/* Form to take minimum and maximum price as input from user */}
          <form>
            <div>
              <h3>Price</h3>
              {/* Input box for minimum price for a service */}
              <input
                label="Minimum Price"
                placeholder="Enter minimum price"
                onChange={(event) => this.handleInput("minPrice", event)}
                value={minPrice}
              />
              {/* Input price for maximum price for a service */}
              <input
                label="Maximum Price"
                placeholder="Enter maximum price"
                onChange={(event) => this.handleInput("maxPrice", event)}
                value={maxPrice}
                className="shift-left"
              />
            </div>
          </form>
          <div>
          <div>
            <h3>Service*</h3>
            {/* Multiselect filter for services */}
            <Multiselect
              dropUp
              data={categoryList}
              value={categoryValue}
              textField="category"
              valueField="category"
              placeholder="Select services to avail"
              filter="contains"
              onChange={(categoryValues) =>
              this.setState({ categoryValue: categoryValues })
              }
            />
          </div>
            <div>
              {/* Multiselect filter for loactions */}
              <h3>Location</h3>
              <Multiselect
                dropUp
                data={locationList}
                value={locationValue}
                textField="location"
                valueField="location"
                placeholder="Select locations for ceremonies"
                filter="contains"
                onChange={(locationValues) =>
                this.setState({ locationValue: locationValues })
                }
              />
            </div>
            <div>
              {/* Filter to sort according to price */}
              <h3>Sort by</h3>
              <DropdownList
                data={priceList}
                value={priceValue}
                textField="price"
                valueField="id"
                placeholder="Sort services by price"
                filter="contains"
                isMulti
                onChange={(priceValues) =>
                this.setState({ priceValue: priceValues })
                }
              />
            </div>
            <div>
              <Button
                onClick={() => this.filterProducts()}
                className="button--filter"
              >
                Go
              </Button>
              <Button
                onClick={() => this.resetFilters()}
                className="button--reset"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
        <div className="shelf-container">
          <ShelfHeader productsLength={products.length} />
          {p}
          <Clearfix />
        </div>
        <Clearfix />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  products: state.shelf.products,
});

export default connect(
  mapStateToProps,
  { fetchProducts, addProduct }
)(Shelf);
