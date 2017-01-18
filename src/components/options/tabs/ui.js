import React from 'react';
import { connect } from 'react-redux';

const MyComponent = props => {
  return (
    <div>
      <p>
        Размер шрифта каталога товаров
      </p>
      <p>
        Цвет выделения строки каталога товаров
      </p>
    </div>
  );
}

export default connect()(MyComponent);
