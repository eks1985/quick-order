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
      <div>
        <div>
          <div>
            Режим показа картинок
          </div>
          <ul>
            <li>Картинка в строке</li>
            <li>Картинка в окне</li>
            <li>Картинка в области</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default connect()(MyComponent);
