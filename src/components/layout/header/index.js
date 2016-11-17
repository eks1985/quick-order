import React from 'react';
import Nav from './nav';
export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 60px',
    border: '1px solid gray',
  };
  return (
    <div className='header' style={style}>
      <Nav />
      <div>
      </div>
    </div>
  );
};
