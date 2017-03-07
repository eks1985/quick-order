import React from 'react';
import { connect } from 'react-redux';
import pictGoods from './../../../images/goods.png';
import pictGoodsGroups from './../../../images/goods-groups.png';
import pictPrices from './../../../images/prices.png';
import pictCustomers from './../../../images/customers.png';
import pictUsers from './../../../images/users.png';
import pictOrders from './../../../images/orders.png';
import pictOptions from './../../../images/options.png';

const DataStructure = props => {
  return (
    <div>
      <p>
        Для корректной работы приложения необходимо обеспечить наличие в firebase следующей структуры данных
      </p>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` goods`}</span>
        <div>Хранит каталог товаров</div>
        <div>Пример узла goods с двумя товарами</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictGoods} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` goods-groups`}</span>
        <div>Хранит категории товаров (пока в линейном виде, опционально будет поддержана иерархия категорий)</div>
        <div>Обратите внимание, что в товаре есть ссылка groupRef на гуид категории</div>
        <div>За счет этого становится возможной фильтрация товаров по категориям</div>
        <div>Пример узла goods-groups с двумя категориями</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictGoodsGroups} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` prices`}</span>
        <div>Хранит цены товаров </div>
        <div>На данный момент цены общие для всех клиентов</div>
        <div>В дальнейшем планируется иметь возможность разделять цены по контрагентам (будет опция в настройках)</div>
        <div>В этом случае цены будут храниться в разрезе гуидов контрагентов</div>
        <div>Пример узла customers с ценами двух товаров</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictPrices} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` customers`}</span>
        <div>Хранит контрагентов</div>
        <div>На данный момент жестко заданы свойства Адрес, Наименование, ИНН, Телефон, которые пользователь видит в профиле после входа</div>
        <div>В дальнейшем планируется сделать добавление произвольных полей</div>
        <div>Интересной идеей также кажется возможность добавления полей-шаблонов</div>
        <div>Например мы хотим чтобы клиент видел в профиле определенный блок данных</div>
        <div>Можно будет описать шаблон этого блока со стороны 1с и хранить его как обычное поле в firebase</div>
        <div>При этом это поле в веб приложении будет вставляться как обычный html кусок кода</div>
        <div>Пример узла customers с двуми контрагентами</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictCustomers} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` users`}</span>
        <div>Хранит пользователей </div>
        <div>Важное уточнение, в данном узле хранятся свойства пользователей, но не хранятся пароли</div>
        <div>Данные пользователей хранятся в разрезе уникальных идентификаторов</div>
        <div>Это уникальные идентификаторы сущностей пользователей из модуля firebase authentication</div>
        <div>В момент создания пользователя в веб приложении администратором в firebase создается две сущности</div>
        <div>Сущность пользователя в базе данных в узле users</div>
        <div>Сущность пользователя в служебном модуле firebase authentication (этот модуль можно просматривать из консоли firebase) </div>
        <div>Пример узла users с двумя пользователями</div>
        <div></div>
        <div style={{marginTop: '10px'}}>
          <img src={pictUsers} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` orders`}</span>
        <div>Хранит заказы</div>
        <div>Узел разбивается на два подузла headers и items</div>
        <div>В узле headers соответственно шапки заказов разбиваются по гуидам контрагентов</div>
        <div>В узле items табличные части заказов разбиваются по гуидам контрагентов и затем по гуидам товаров</div>
        <div>Это сделано для оптимизации, т.к. при старте сначала загружаются шапки заказов и пользователь сразу видит список</div>
        <div>Затем подгружаются табличные части</div>
        <div>Поля шапки:</div>
        <div>amount: сумма заказа</div>
        <div>comment: комментарий пользователяк заказу</div>
        <div>date: дата заказа</div>
        <div>deleted: пометка удаления (применимо когда не включена опция "Непосредственно удалять заказы")</div>
        <div>enterpriseNr: номер заказа в 1с</div>
        <div>nr: номер заказа, формируется автоматически firebase при создании заказа, представляет собой последовательно возрастающий id</div>
        <div>ref: пользовательский номер заказа, который пользователь ввел в соответствующем поле при оформлении заказа</div>
        <div>status: заказ создан - new, заказ обработан - processed, заказ перенесен в черновик - draft</div>
        <div>Поля табличной части</div>
        <div>amount: сумма строки</div>
        <div>code: артикул товаора</div>
        <div>description: наименование товара</div>
        <div>groupRef: ссылка на категорию</div>
        <div>price: цена</div>
        <div>qty: количество</div>
        <div>Пример узла orders с двумя заказами</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictOrders} alt='123'></img>
        </div>
      </div>

      <div style={{marginTop: '10px'}}>
        <span>Узел</span><span style={{fontWeight: 'bold', color: '#F44336'}}>{` options`}</span>
        <div>Хранит опции</div>
        <div>Это служебный узел и данные в него записываются при установке настроек на стороне веб приложения, сортировки колонок и т.д.</div>
        <div>Пример узла options демо приложения</div>
        <div style={{marginTop: '10px'}}>
          <img src={pictOptions} alt='123'></img>
        </div>
      </div>

    </div>
  );
}

export default connect()(DataStructure);
