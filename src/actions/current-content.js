export const setCurrentContent = (contentName) => {
  return dispatch => {
    dispatch({
      type: 'SET_CURRENT_CONTENT',
      contentName
    });
  };
};
