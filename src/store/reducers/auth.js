const initialState = {
	displayName: null,
	uid: null,
	status: 'AUTH_ANONYMOUS',
	email: '',
	error: '',
	firstAccess: true,
	usersCheckComplete: false,
};

//utils

const translateError = (error) => {
	switch (error) {
		case 'The email address is badly formatted.':
			return 'Неверный формат email';
		case 'The password is invalid or the user does not have a password.':
			return 'Неверный пароль';
		case 'There is no user record corresponding to this identifier. The user may have been deleted.':
			return 'Пользователь не найден';
		default:
			return error;
	}
};

export default (state, action) => {
	switch (action.type) {
		case 'AUTH_OPEN':
			return { ...state, status: 'AUTH_AWAITING_RESPONSE', username: 'guest', uid: null, email: '', error: '' };
		case 'AUTH_LOGIN':
			return { ...state, status: 'AUTH_LOGGED_IN', username: action.username, uid: action.uid, email: action.email, error: '' };
		case 'AUTH_LOGOUT':
			return { ...state, status: 'AUTH_ANONYMOUS', username: 'guest', uid: null, email: '', error: state.error, firstAccess: false };
		case 'AUTH_ERROR':
			return { ...state, status: 'AUTH_ERROR', username: '', uid: null, email: '', error: translateError(action.error) };
		case 'AUTH_RESET_FIRST_ACCESS':
			return { ...state, firstAccess: false };
		case 'AUTH_USERS_CHECK_COMPLETE':
			return { ...state, usersCheckComplete: true };
		default: return state || initialState;
	}
};
