import React from 'react';
import Pagination from './pagination';
import List from './list';
import Search from './search';
import Paper from 'material-ui/Paper';

export default () => {
  const style = {
    display: 'flex',
    flex: '1 0 auto',
    flexDirection: 'column',
    // border: '1px solid gray',
    padding: '10px'
  };
  return (
    <Paper className='catalog' style={style} zDepth={2}>
      <div style={{display: 'flex', justifyContent: 'space-between', height: '65px'}}>
        <Search />
        <Pagination />
      </div>

      <List />
    </Paper>
  );
};
