import React from 'react';
export default () => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    border: '1px solid gray'
  };
  return (
    <div className='orders' style={style}>
      Orders
    </div>
  );
};
