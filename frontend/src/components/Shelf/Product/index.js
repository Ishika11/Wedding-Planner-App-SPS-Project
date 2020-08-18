import React from 'react';
import PropTypes from 'prop-types';
import 'frontend/src/components/products/ServicePage.jsx'
import Thumb from '../../Thumb';
import util from '../../../services/util';

const Product = props => {
  const product = props.product;

  product.quantity = 1;

  let formattedPrice = util.formatPrice(product.price, product.currencyId);

  let productInstallment;

  function viewProduct(){
    <ServicePage id= {product.id}/>
    return
  }
  if (!!product.installments) {
    const installmentPrice = product.price / product.installments;

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

  return (
    <div
      className="shelf-item"
    >
      <Thumb
        classes="shelf-item__thumb"
        src={product.url}
        alt={product.name}
      />
      <button onclick="viewProduct()">View Product</button>
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>{product.currencyFormat}</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      <div 
      className="shelf-item__buy-btn"
      onClick={() => props.addProduct(product)}
      >Add to cart</div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired
};

export default Product;
