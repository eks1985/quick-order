import React, { Component }  from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

import darkBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const Config = ({
  //actions
  setFirebaseConfig
}) => {
  let apiKey, databaseURL;
  return (
    <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
      <div>
        <p>Введите <span style={{fontWeight: 'bold'}}>apiKey</span> и  <span style={{fontWeight: 'bold'}}>databaseURL</span> своего приложения firebase и нажмите на кнопку Подключиться</p>
      </div>
      <div>
        <TextField
          placeholder='apiKey'
          id='apiKey'
          ref={
            (node)=>{
              apiKey = node;
            }
          }
          style={{width: '400px'}}
          onTouchTap={
            ()=> {
              //console.log('touch tap');
            }
          }
        />
      </div>
      <div>
        <TextField
          placeholder='databaseURL'
          id='databaseURL'
          ref={
            (node)=>{
              databaseURL = node;
            }
          }
          style={{width: '400px'}}
        />
      </div>
      <div>
        <RaisedButton
          label='Подключиться'
          onClick={
            () => {
              const apiKeyVal = apiKey.input.value.trim();
              const databaseURLVal = databaseURL.input.value.trim();
              let ok = true;
              if (!apiKeyVal) {
                alert('Не задан apiKey');
                ok = false;
              }
              if (!databaseURLVal && ok) {
                alert('Не задан databaseURL');
                ok = false;
              }
              const firebaseConfig = {
            		apiKey: apiKeyVal,
                databaseURL: databaseURLVal,
            	};
            	if (ok) {
                localStorage.setItem('firebaseConfig', JSON.stringify(firebaseConfig));
                location.reload();
            	}
            }
          }
        />
      </div>
      <p>Или</p>
      <RaisedButton
        label='Подключиться к демо'
        onClick={
          () => {
            const firebaseConfig = {
              apiKey: "AIzaSyBzPxu9Yt_kPLReqaN3J3tpLJK3OJky_gI",
              databaseURL: "https://quick-order-de84c.firebaseio.com",
            };
            localStorage.setItem('firebaseConfig', JSON.stringify(firebaseConfig));
            location.reload();
          }
        }
      />
      <p style={{marginTop: '50px'}}>Где найти <span style={{fontWeight: 'bold'}}>apiKey</span> и  <span style={{fontWeight: 'bold'}}>databaseURL</span> своего приложения?</p>
      <div style={{marginTop: '30px'}}>
        <img alt='Поясняющая картинка' src='https://firebasestorage.googleapis.com/v0/b/quick-order-de84c.appspot.com/o/settings-fb.png?alt=media&token=858e1c69-97e7-4241-88a4-8b8e6422c1b1' />      
      </div>
    </div>
  );
};

export default class firebaseConfigWrapper extends Component {

  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
        <Config />
      </MuiThemeProvider>
    );
  }

}
