import React from "react";
import PropTypes from "prop-types";
import ServicePage from "../../products/ServicePage";
// import CreateForm from '../../products/CreateForm.jsx';
import Thumb from "../../Thumb";
import util from "../../../Services/util";

const Product = (props) => {
  const product = props.product;

  product.quantity = 1;

  let formattedPrice = util.formatPrice(
    product.priceEstimate,
    product.currencyId
  );

  // eslint-disable-next-line
  let productInstallment;

  function viewProduct() {
    console.log(product.id);
    return <ServicePage id={product.id} />;
  }
  if (!!product.installments) {
    const installmentPrice = product.priceEstimate / product.installments;

    productInstallment = (
      <div className="installment">
        <span>or {product.installments} x</span>
        <b>
          {" "}
          {product.currencyFormat}{" "}
          {util.formatPrice(installmentPrice, product.currencyId)}
        </b>
      </div>
    );
  }
  var size;
  var imageUrl;
  if (typeof product.serviceImages !== "undefined") {
    size = product.serviceImages.length;
  } else {
    size = 0;
  }
  if (size === 0) {
    imageUrl = "https://i.postimg.cc/fLSfSqsK/105-1.jpg";
  } else {
    imageUrl = product.serviceImages[0].url;
  }

  return (
    <div className="shelf-item">
      <Thumb classes="shelf-item__thumb" src={imageUrl} alt={product.name} />
      <button onClick={() => viewProduct()}>View Product</button>
      <p className="shelf-item__title">{product.name}</p>
      <div className="shelf-item__price">
        <div className="val">
          <small>INR</small>
          <b>{formattedPrice.substr(0, formattedPrice.length - 3)}</b>
          <span>{formattedPrice.substr(formattedPrice.length - 3, 3)}</span>
        </div>
      </div>
      <div
        className="shelf-item__buy-btn"
        onClick={() => props.addProduct(product)}
      >
        Add to cart
      </div>
    </div>
  );
};

Product.propTypes = {
  product: PropTypes.object.isRequired,
  addProduct: PropTypes.func.isRequired,
};

export default Product;
