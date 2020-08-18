import React, { Component } from "react";
import { DropdownList, Multiselect } from "react-widgets";
import { Button } from "reactstrap";
import baseUrl from "./url";
import urlToDefaultDisplay from "./urlForDefaultDisplay";
import "./dropdown.scss";


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

/**
* Class to list all the services with filters applied.
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
            productList: response,
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
            if (sizeOfLocationArray!==0) {
                //If user selects only one location
                if(sizeOfLocationArray===1){
                    url+='name=';
                    url+=locationValue[0];
                    url+='&';
                }
                //If user selects multiple locations
                else{
                    for(var iterator=0;iterator<sizeOfLocationArray-1;iterator++){
                        if(iterator===0){
                            url+='name=';
                            url+=locationValue[iterator];
                            url+=',';
                        }
                        else{
                        url+=locationValue[iterator];
                        url+=',';
                        }
                    } 
                    //Appending the last location to URL
                    url+=locationValue[sizeOfLocationArray-1];
                    url+='&'
                }
            }
        }

        //Constructing the URL from the user selected set of services.
        if(categoryValue){
            var sizeOfCategoryArray;
            sizeOfCategoryArray=categoryValue.length;
            if (sizeOfCategoryArray!==0) {
                //If user selects only one service
                if(sizeOfCategoryArray===1){
                    url+='category=';
                    url+=categoryValue[0];
                    url+='&';
                }
                //If user selects multiple services
                else{
                    for(iterator=0;iterator<sizeOfCategoryArray-1;iterator++){
                        if(iterator===0){
                            url+='category=';
                            url+=categoryValue[iterator];
                            url+=',';
                        }
                        else{
                        url+=categoryValue[iterator];
                        url+=',';
                        }
                    } 
                    //Appending the last service to URL
                    url+=categoryValue[sizeOfCategoryArray-1];
                    url+='&'
                }
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
                productList: response,
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
                productList: response,
            });
        });
    };

    /**
    * Renders
    * @returns {void}
    */
    render() {
    // eslint-disable-next-line
    const { productList } = this.state;
    const { locationValue } = this.state;
    const { priceValue } = this.state;
    const { categoryValue } = this.state;
    const { minPrice } = this.state;
    const { maxPrice } = this.state;

    return (
        <div>
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
    );
    }
    }

export default Filter;
