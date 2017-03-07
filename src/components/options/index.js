import React from 'react';

import Paper       from 'material-ui/Paper';
import {Tabs, Tab} from 'material-ui/Tabs';

import BusinessLogic from './tabs/business-logic';
import Data          from './tabs/data';
import Ui            from './tabs/ui';
import DataStructure from './tabs/data-structure';
// import IntialConfig  from './tabs/initial-config';

const Options = props => {

  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '10px', flex: '1 0 auto'}}>
      <Tabs>
        <Tab label='Описание структуры данных'>
          <DataStructure />
        </Tab>
        <Tab label="Структура данных" >
          <Data />
        </Tab>
        <Tab label="Бизнес логика" >
          <BusinessLogic />
        </Tab>
        <Tab label="Интерфейс" >
          <Ui />
        </Tab>
        {/* <Tab label="Первоначальная настройка" >
          <IntialConfig />
        </Tab> */}
      </Tabs>
    </Paper>
  );
};

export default Options;
