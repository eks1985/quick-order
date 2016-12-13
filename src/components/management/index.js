import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Paper from 'material-ui/Paper';
import { connect } from 'react-redux';
import * as authActions from './../../actions/auth';
import { getUsersAdmins, getUsersNoAdmins } from './../../store/reducers/users';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import { v4 } from 'node-uuid';
import {grey400} from 'material-ui/styles/colors';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import * as usersActions from './../../actions/users-firebase';

const Management = ({
  usersAdmins,
  usersNoAdmins,
  //container
  pwd,
  handleGeneratePwd,
  //actions
  createUser,
  blockUser,
  unblockUser
}) => {
  let name, password;

  const getAdminsJsx = () => {
    const keys = Object.keys(usersAdmins);
    return (
      <List style={{width: '300px'}}>
        {keys.map(key => <ListItem primaryText={usersAdmins[key].email} key={key} />)}
      </List>
    );
  }

  const getNoAdminsJsx = () => {
    const keys = Object.keys(usersNoAdmins);
    return (
      <List style={{width: '300px'}}>
        {
          keys.map(key => {
            const iconButtonElement = (
              <IconButton
                touch={true}
                tooltipPosition="bottom-left"
              >
                <MoreVertIcon color={grey400} />
              </IconButton>
            );
            const rightIconMenu = (
              <IconMenu iconButtonElement={iconButtonElement}>
                {!usersNoAdmins[key].disabled &&
                  <MenuItem
                    onTouchTap={
                      () => {
                        blockUser(key);
                      }
                    }
                  >
                    Заблокировать
                  </MenuItem>
                }
                {usersNoAdmins[key].disabled &&
                  <MenuItem
                    onTouchTap={
                      () => {
                        unblockUser(key);
                      }
                    }
                  >
                    Разблокировать
                  </MenuItem>
                }
                <MenuItem
                  onTouchTap={
                    () => {
                      alert('Пока не работает :)');
                    }
                  }
                >
                  Связать с контрагентом
                </MenuItem>
              </IconMenu>
              );

            return (
              <ListItem
                style={usersNoAdmins[key].disabled ? {color: grey400} : {}}
                primaryText={usersNoAdmins[key].email}
                key={key}
                rightIconButton={rightIconMenu} />
            );
          })
        }
      </List>
    );
  };

  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '20px', flex: '1', alignItems: 'flex-start'}}>
      <Subheader>Новый пользователь</Subheader>
      <Paper zDepth={2} style={{padding: '20px', display: 'flex', flexDirection: 'column'}}>
        <TextField
          id='userName'
          placeholder='email'
          ref={
            node => {
              name = node;
            }
          }
        />
        <TextField
          id='userPwd'
          placeholder='пароль'
          value={pwd}
          ref={
            node => {
              password = node;
            }
          }
        />
        <FlatButton
          style={{fontWeight: 'normal'}}
          label='Сгенерировать пароль'
          onClick={
            () => {
              handleGeneratePwd(v4().slice(0,6));
            }
          }
        />
        <RaisedButton
          style={{fontWeight: 'normal'}}
          label='Создать пользователя'
          style={{border: '1px solid #ddd'}}
          onClick={
            () => {
              createUser(name.input.value.trim(), password.input.value.trim())}
            }
        />
      </Paper>
      <Subheader>Администраторы</Subheader>
      <Paper zDepth={2}>
        {Object.keys(usersAdmins).length > 0 && getAdminsJsx()}
      </Paper>
      <Subheader>Пользователи</Subheader>
      <Paper zDepth={2}>
        {Object.keys(usersNoAdmins).length > 0 && getNoAdminsJsx()}
      </Paper>
    </Paper>
  );
};

class ManagementContainer extends Component {

  constructor() {
    super();
    this.state = { pwd: ''};
    this.handleGeneratePwd = this.handleGeneratePwd.bind(this);
  }

  handleGeneratePwd (pwd) {
    this.setState({ pwd });
  }

  render () {
    return <Management { ...this.props } handleGeneratePwd={this.handleGeneratePwd} pwd={this.state.pwd} />
  }

}

export default connect(
  state => ({ usersAdmins: getUsersAdmins(state.users), usersNoAdmins: getUsersNoAdmins(state.users) }),
  { ...authActions, ...usersActions }
)(ManagementContainer);
