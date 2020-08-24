import React from 'react';
import PropTypes from 'prop-types';
import Thumb from '../../Thumb';
import Button from "@material-ui/core/Button";
import util from '../../../Services/util';
import { Grid } from '@material-ui/core';

const Product = props => {
  const product = props.product;
  
  product.quantity = 1;

  let formattedPrice = util.formatPrice(product.priceEstimate, product.currencyId);

  // eslint-disable-next-line
  let productInstallment;

  let url;
  let x;
  x=product.id;

  if (!!product.installments) {
    const installmentPrice = product.priceEstimate / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {' '}
          {product.currencyFormat}{' '}
          {util.formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }
    var size;
    var imageUrl;
    if(typeof product.serviceImages !== 'undefined'){
      size=product.serviceImages.length;
    }
    else{
      size=0;
    }
    if(size===0){
      imageUrl="https://i.postimg.cc/fLSfSqsK/105-1.jpg";
    }
    else{
      imageUrl='';
      imageUrl+='http://localhost:4000/';
      imageUrl+=product.serviceImages[0].url;
    }

  return (
    <div
      className="shelf-item"
    >
      <div style={{height:'0px',widht:'0px'}}>
      <Thumb
        classes="shelf-item__thumb"
        src={imageUrl}
        alt={product.name}
      />   
      </div>
      <div style={{marginTop:'80%'}}>
      <Button 
      href={"/service/" + x}>View Product</Button>
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>INR</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
          <span>  {product.estimateUnit}</span>
        </div>
      </div>
      <div 
      className="shelf-item__buy-btn"
      onClick={() => props.addProduct(product)}
      >Add to cart</div>
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default Product;
