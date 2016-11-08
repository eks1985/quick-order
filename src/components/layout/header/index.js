import React from 'react';
import Nav from './nav';
export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    height: '150px',
    border: '1px solid gray',
  };
  return (
    <div className='header' style={style}>
      <Nav />
      <div>
        Header
      </div>
    </div>
  );
};
