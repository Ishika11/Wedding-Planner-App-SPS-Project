import React, { Component } from 'react';
import { DropdownList } from 'react-widgets';
import { Button } from 'reactstrap';
import baseUrl from './url';
import './dropdown.scss';

const categoryList = [
    {category: 'Entertainment' },
    {category: 'Caterer' },
    {category: 'Venue' },
    {category: 'Clothes' },
    {category: 'Gifts' },
];

const priceList = [
    { id: 'ASC', price: 'Lowest to Highest' }, 
    { id: 'DESC', price: 'Hightest to Lowest' }
];

const locationList = [
    { location: 'Mumbai' },
    { location: 'Delhi' },
    { location: 'Bangalore' },
    { location: 'Goa' },
    { location: 'Kolkata' },
    { location: 'Chandigarh' },
];

/**
 * Class to list all the products with filters
 */
class Filter extends Component {
    /**
     * @returns {void}
     */
    constructor(props) {
        super(props);
        this.state = {
        productList: [],
        priceValue: null,
        categoryValue: null,
        locationValue: null,
        minPrice:'',
        maxPrice:'',
        };
        this.handleInput = this.handleInput.bind(this);
    }

    /**
     * Mounts the component, see React docs.
     * @returns {void}
     */
    componentDidMount() {
        const getProducts = `${baseUrl}api/service`;
        fetch(getProducts, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
            productList: response,
            });
        });
    }

    /**
     * Sets the state for fields in the form 
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
        const {minPrice}=this.state;
        const {maxPrice}=this.state;

        let url = `${baseUrl}api/service/query?`;
        if (locationValue) {
        url = `${url}name=${locationValue.location}&`;
        }
        if (categoryValue) {
        url = `${url}category=${categoryValue.category}&`;
        }
        if (priceValue) {
        url = `${url}priceEstimate=${priceValue.id}&`;
        }
        if (minPrice) {
        url = `${url}minPrice=${minPrice}&`;
        }
        if (maxPrice) {
        url = `${url}maxPrice=${maxPrice}&`;
        }

        console.log(url);
        console.log(minPrice);
        console.log(maxPrice);
        fetch(url, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        })
        .then((response) => response.json())
        .then((response) => {
            this.setState({
            productList: response,
            });
        });
    };

    /**
     * Resets the state of Filters to null
     * @returns {void}
     */
    resetFilters = () => {
        this.setState({
        priceyValue: null,
        categoryValue: null,
        locationValue: null,
        });
    };

    /**
     * Renders the plugin
     * @returns {void}
     */
    render() {
        const { productList } = this.state;
        const { locationValue } = this.state;
        const { priceValue } = this.state;
        const { categoryValue } = this.state;
        const { minPrice } = this.state;
        const { maxPrice } = this.state;  

        return (
            <div>
                <form className="form-container">
                    <div className="input-price-flex-row">
                    <input
                        className="input-text-box reduce-width-to-half"
                        label="Minimum Price"
                        placeholder="Enter minimum price"
                        onChange={(event) => this.handleInput('minPrice', event)}
                        value={minPrice}
                    />
                    <input
                        className="input-text-box reduce-width-to-half"
                        label="Maximum Price"
                        placeholder="Enter maximum price"
                        onChange={(event) => this.handleInput('maxPrice', event)}
                        value={maxPrice}
                    />
                    </div>
                </ form>
                <div className="list-page-body-ui">
                    <div className="filter-container-position">
                        <div className="filter-reset-button-flex-row ">
                            <h2>Filters</h2>
                            <Button onClick={() => this.filterProducts()} className="button--filter">
                            Filter
                            </Button>
                            <Button onClick={() => this.resetFilters()} className="button--reset">
                            Reset
                            </Button>
                        </div>
                        <div className="filter-conatiner-row-margin-left">
                            <h2>Categorys</h2>
                            <DropdownList
                            data={categoryList}
                            value={categoryValue}
                            textField="category"
                            valueField="category"
                            filter="contains"
                            className="filter-list-dropdown"
                            isMulti
                            onChange={(categoryValues) => this.setState({ categoryValue: categoryValues })}
                            />
                        </div>
                        <div>
                            <h2>Locations</h2>
                            <DropdownList
                            data={locationList}
                            value={locationValue}
                            textField="location"
                            valueField="location"
                            filter="contains"
                            className="filter-list-dropdown"
                            isMulti
                            onChange={(locationValues) => this.setState({ locationValue: locationValues })}
                            />
                        </div>
                        <div>
                            <h2>Order by</h2>
                            <DropdownList
                            data={priceList}
                            value={priceValue}
                            textField="price"
                            valueField="id"
                            filter="contains"
                            isMulti
                            className="filter-list-dropdown"
                            onChange={(priceValues) => this.setState({ priceValue: priceValues })}
                            />
                        </div> 
                    </div>
                    {/* Listing Products in tabular form */}
                    <div className="list-table-position">
                        <h1 id="title">Products</h1>
                        <table id="table">
                            <tbody>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Estimate unit</th>
                                <th>Price Estimate</th>
                                <th>Conatct Number</th>
                            </tr>
                            {productList &&
                                productList.map((product) => {
                                return (
                                    <tr>
                                    <td>
                                        {product.id}
                                    </td>
                                    <td>
                                        {product.name}
                                    </td>
                                    <td>
                                        {product.category}
                                    </td>
                                    <td>
                                        {product.estimateUnit}
                                    </td>
                                    <td>
                                        {product.priceEstimate}
                                    </td>
                                    <td>
                                        {product.contact}
                                    </td>
                                    </tr>
                                );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }
}

export default Filter;
