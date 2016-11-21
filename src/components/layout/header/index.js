import React from 'react';
import Nav from './nav';
// import Paper from 'material-ui/Paper';

export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    flex: '0 0 60px',
    padding: '10px',
    background: '#eee'
    // border: '1px solid gray',
  };
  return (
    <div className='header' style={style}>
      <Nav />
      <div>
      </div>
    </div>
  );
};
