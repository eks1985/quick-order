import React from 'react';
import Header from './header';
import List from './list';
import Paper from 'material-ui/Paper';

export default () => {
  return (
    <div>
      <Paper style={{padding: '10px'}}>
        <Header />
        <List />
      </Paper>
    </div>
  );
};
