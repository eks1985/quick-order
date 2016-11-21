import React from 'react';
import Paper from 'material-ui/Paper';

export default () => {
  const style = {
    display: 'flex',
    height: '100px',
    background: '#eee'
    // border: '1px solid gray'
  };
  return (
    <Paper className='footer' style={style} />
  );
};
