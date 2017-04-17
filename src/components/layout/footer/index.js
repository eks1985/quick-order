import React from 'react';
import Paper from 'material-ui/Paper';

export default () => {
  const style = {
    display: 'flex',
    // height: '100px',
    background: '#eee'
    // border: '1px solid gray'
  };
  return (
    <Paper className='footer' style={style} id='footer'>
        <div
          style={{cursor: 'pointer'}}
          onClick={
            ()=>{
              const yes = confirm('Приложение будет отключено от текущего хранилища firebase. Уверены?');
              if (yes) {
                localStorage.removeItem('firebaseConfig');
                location.reload();
              }
            }
          }
        >
          <svg id="Layer_1" version="1.2" viewBox="0 0 512 512" width="80px" height='80px'><g><path d="M297.036,205.578l-36.334,33.809l-33.716-68.005l17.446-39.108c4.416-7.84,11.621-7.855,16.037,0   L297.036,205.578z" fill="#ccc"/><polygon fill="#bbb" points="260.702,239.386 124.924,365.697 226.986,171.381  "/><path d="M336.776,153.901c6.491-6.239,13.202-4.111,14.912,4.729l35.342,205.375L269.873,434.22   c-4.1,2.264-14.957,3.246-14.957,3.246s-9.91-1.185-13.687-3.281L124.92,365.69L336.776,153.901z" fill="#ddd"/><path d="M226.986,171.381L124.924,365.697l45.46-283.998c1.674-8.847,6.71-9.699,11.203-1.89L226.986,171.381z" fill="#aaa"/></g></svg>
        </div>
    </Paper>
  );
};
