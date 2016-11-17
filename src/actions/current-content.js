export const setCurrentContent = (contentName) => {
  console.log('setCurrentContent', contentName);
  return dispatch => {
    dispatch({
      type: 'SET_CURRENT_CONTENT',
      contentName
    });
  }
}
