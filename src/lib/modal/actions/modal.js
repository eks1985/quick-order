export const setModal = ({x = 0, y = 0, fullScreen = false, center = false, content = '', data = {}, style = {}, showClose = false } = {}) => {
  return {
    type: 'SET_MODAL',
    x,
    y,
    content,
    data,
    fullScreen,
    center,
    style,
    showClose
  };
};
