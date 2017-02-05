// const initialState = {comment: '', ref: ''};

export default (state = {comment: '', ref: ''}, action) => {
  switch (action.type) {
    case 'SET_COMMENT_CHECKOUT':
      return { ...state, comment: action.comment }
    case 'SET_REF_CHECKOUT':
        return { ...state, ref: action.ref }
    case 'RESET_CHECKOUT':
      return state;
    default:
      return state;
  }
}
