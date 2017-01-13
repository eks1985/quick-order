export const setFocused = payload => {
  // if (payload) {
  //   document.getElementById(payload).focus();
  // }
  return {
    type: 'SET_FOCUSED',
    payload
  }
}
