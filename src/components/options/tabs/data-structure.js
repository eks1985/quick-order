import React from 'react';
import { connect } from 'react-redux';
import pictGoods from './pict/goods.png';

const DataStructure = props => {
  return (
    <div>
      <p>
        Для корректной работы приложения необходимо обеспечить наличие в firebase следующей структуры данных
      </p>

      <div>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` goods`}</span>
        <div>Отвечает за отображение каталога товаров</div>
        <div>Пример узла goods с одним товаром</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictGoods} alt='123'></img>
        </div>
      </div>


    </div>
  );
}

export default connect()(DataStructure);
