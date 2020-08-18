import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Thumb from './../../Thumb';
import util from '../../../Services/util';

class CartProduct extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    removeProduct: PropTypes.func.isRequired
  };

  state = {
    isMouseOver: false
  };

  handleMouseOver = () => {
    this.setState({ isMouseOver: true });
  };

  handleMouseOut = () => {
    this.setState({ isMouseOver: false });
  };

  render() {
    const { product, removeProduct } = this.props;

    const classes = ['shelf-item'];

    if (!!this.state.isMouseOver) {
      classes.push('shelf-item--mouseover');
    }
    var size;
    var imageUrl;
    size=product.serviceImages.length;
    if(size===0){
      imageUrl="https://i.postimg.cc/fLSfSqsK/105-1.jpg";
    }
    else{
      imageUrl='';
      imageUrl+='backend/';
      imageUrl+=product.serviceImages[0].url;
      console.log(imageUrl);
    }
    return (
      <div className={classes.join(' ')}>
        <div
          className="shelf-item__del"
          onMouseOver={() => this.handleMouseOver()}
          onMouseOut={() => this.handleMouseOut()}
          onClick={() => removeProduct(product)}
        />
        <Thumb
          classes="shelf-item__thumb"
          src={imageUrl}
          alt={product.title}
        />
        <div className="shelf-item__details">
          <p className="title">{product.name}</p>
          <p className="desc">
            Quantity: {product.quantity}
          </p>
        </div>
        <div className="shelf-item__price">
          <p>{`${product.currencyFormat}  ${util.formatPrice(
            product.priceEstimate
          )}`}</p>
        </div>
        <div className="clearfix" />
      </div>
    );
  }
}

export default CartProduct;
