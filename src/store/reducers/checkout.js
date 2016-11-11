const initialState = {comment: 'Комментарий...'};

export default (state, action) => {
  switch (action.type) {
    case 'SET_COMMENT_CHECKOUT':
      return { ...state, comment: action.comment }
    case 'RESET_CHECKOUT':
      return initialState;
    default:
      return initialState;
  }
}
