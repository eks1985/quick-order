export default (state = {apiKey: '', databaseURL: ''}, action) => {
  switch (action.type) {
    case 'RECEIVE_FIREBASE_CONFIG':
      return action.payload;
    default:
      return state;
  }  
};