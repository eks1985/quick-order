export default (state = {comment: '', ref: '', id: ''}, action) => {
  switch (action.type) {
    case 'SET_COMMENT_CHECKOUT':
      return { ...state, comment: action.comment }
    case 'SET_REF_CHECKOUT':
      return { ...state, ref: action.ref }
    case 'SET_ID_CHECKOUT':
      return { ...state, id: action.id }
    case 'RESET_CHECKOUT':
      return { comment: '', ref: '', id: ''};
    default:
      return state;
  }
}
