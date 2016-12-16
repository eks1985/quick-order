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
import Drawer from 'material-ui/Drawer';
import IconClose  from 'material-ui/svg-icons/content/clear';

const Management = ({
  usersAdmins,
  usersNoAdmins,
  customers,
  //container
  pwd,
  paneStatus,
  handleGeneratePwd,
  handleAssignCustomer,
  handleSetCurrentUser,
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
  };

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
                      handleSetCurrentUser(key);
                      handleAssignCustomer(true);
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
                secondaryText={ usersNoAdmins[key].customerRef ? customers[usersNoAdmins[key].customerRef].description: ''}
                key={key}
                rightIconButton={rightIconMenu} />
            );
          })
        }
      </List>
    );
  };
  
  const getCustomerJsx = (key) => {
    return (
      <MenuItem 
        key={key}
        value={key}
        onTouchTap={
          (e) => {
            handleAssignCustomer(false, key);
          }
        }
      >
        {customers[key].description}  
      </MenuItem>
    );
  };
  
  const getAssignCustomerPaneJsx = () => {
    return (
      <Drawer open={paneStatus}>
       {
         Object.keys(customers).map(key => getCustomerJsx(key))
       }
       <IconButton 
        style={{position: 'absolute', top: '0px', right: '0px'}} 
        onClick={
          ()=>{
            handleAssignCustomer(false);
          }
        }
       >
        <IconClose />
       </IconButton>
      </Drawer>  
    );
  };

  return (
    <Paper style={{display: 'flex', flexDirection: 'column', padding: '20px', flex: '1', alignItems: 'flex-start'}}>
      {paneStatus === true && getAssignCustomerPaneJsx()}
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
          label='Сгенерировать пароль'
          labelStyle={{fontWeight: 'normal'}}
          onClick={
            () => {
              handleGeneratePwd(v4().slice(0,6));
            }
          }
        />
        <RaisedButton
          style={{border: '1px solid #ddd'}}
          labelStyle={{fontWeight: 'normal'}}
          label='Создать пользователя'
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
    this.state = { pwd: '', paneStatus: false, customerKey: '', user: '' };
    this.handleGeneratePwd = this.handleGeneratePwd.bind(this);
    this.handleAssignCustomer = this.handleAssignCustomer.bind(this);
    this.handleSetCurrentUser = this.handleSetCurrentUser.bind(this);
  }

  handleGeneratePwd (pwd) {
    this.setState({ pwd });
  }
  
  handleSetCurrentUser (user) {
    this.setState({ user });
  }
  
  handleAssignCustomer (status, key = '') {
    key && this.props.assignCustomer(this.state.user, key);
    this.setState({ paneStatus: status, customerKey: key });
  }
  
  render () {
    return <Management { ...this.props } paneStatus={this.state.paneStatus} handleSetCurrentUser={this.handleSetCurrentUser} handleGeneratePwd={this.handleGeneratePwd} handleAssignCustomer={this.handleAssignCustomer} pwd={this.state.pwd}  />;
  }

}

export default connect(
  state => ({ usersAdmins: getUsersAdmins(state.users), usersNoAdmins: getUsersNoAdmins(state.users), customers: state.customers }),
  { ...authActions, ...usersActions }
)(ManagementContainer);
