import React from 'react';
import List from './list';
import Pagination from './pagination';

export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '1 0 auto',
    // border: '1px solid gray',
    padding: '10px'
  };
  return (
    <div className='orders' style={style}>
      <div style={{display: 'flex', justifyContent: 'flex-end'}}>
        <Pagination />
      </div>
      <List />
    </div>
  );
};
