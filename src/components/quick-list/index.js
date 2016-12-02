import React from 'react';
import Header from './header';
import List from './list';
import Paper from 'material-ui/Paper';

export default () => {
  return (
    <div style={{display: 'flex', alignItems: 'stretch', flex: '1'}}>
      <Paper style={{padding: '10px', flex: '1'}}>
        <Header />
        <List />
      </Paper>
    </div>
  );
};
