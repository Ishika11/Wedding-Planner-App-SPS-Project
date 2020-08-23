const formatPrice = (x, currency) => {
  switch (currency) {
    case 'BRL':
      if(typeof x==='undefined'){
        return '0';
      }
      return x.toFixed(2).replace('.', ',');
    default:
      if(typeof x==='undefined'){
        return '0';
      }
      return x.toFixed(2);
  }
};

export default {
  formatPrice
};
