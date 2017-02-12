import React from 'react';
import List from './list';
import Pagination from './pagination';
import Filters from './filters';

export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto'
  };
  return (
    <div className='orders' style={style}>
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
        <Filters />
        <Pagination />
      </div>
      <List />
    </div>
  );
};
