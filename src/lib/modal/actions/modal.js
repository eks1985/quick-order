export const setModal = ({x = 0, y = 0, fullScreen = false, content = '', data = {}, }) => {
  return {
    type: 'SET_MODAL',
    x,
    y,
    content,
    data,
    fullScreen
  };
};
