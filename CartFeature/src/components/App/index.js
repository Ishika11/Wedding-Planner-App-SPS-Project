import React from 'react';

import Shelf from '../Shelf';
import Filter from '../Shelf/Filter';
import FloatCart from '../FloatCart';

const App = () => (
  <React.Fragment>
    <main>
      <Shelf />
    </main>
    <FloatCart />
  </React.Fragment>
);

export default App;