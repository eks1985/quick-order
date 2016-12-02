import React from 'react';
import Header from './header';
import Content from './content';
import Footer from './footer';

export default () => {
  const style = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh'
  };
  return (
    <div className='layout' style={style}>
      <Header />
      <Content />
      <Footer />
    </div>
  );
};
