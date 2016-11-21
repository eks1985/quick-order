import initialState from './initialData/goods-groups';

export default (state, action) => {
  switch (action.type) {
    case 'RECEIVE_GOODS_GROUPS':
      return { ...state, ...action.payload }
    default:
      return state || initialState;
  }
};
