import React from 'react';
import Pagination from './pagination';
import List from './list';

export default () => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    border: '1px solid gray',
    padding: '10px'
  }
  return (
    <div className='catalog' style={style}>
      <Pagination />
      <List />
    </div>
  );
};
