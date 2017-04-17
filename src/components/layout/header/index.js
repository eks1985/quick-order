import React from 'react';
import Nav from './nav';

export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 60px',
    padding: '10px',
    background: '#eee'
  };
  return (
    <div className='header' style={style} id='header'>
      <Nav />
      <div>
      </div>
    </div>
  );
};
