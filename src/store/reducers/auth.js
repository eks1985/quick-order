const initialState = {
	username: null,
	uid: null,
	status: 'AUTH_ANONYMOUS',
	email: '',
	error: ''
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
			return {
				status: 'AUTH_AWAITING_RESPONSE',
				username: 'guest',
				uid: null,
				email: '',
				error: ''
			};
		case 'AUTH_LOGIN':
			return {
				status: 'AUTH_LOGGED_IN',
				username: action.username,
				uid: action.uid,
				email: action.email,
				error: ''
			};
		case 'AUTH_LOGOUT':
			return {
				status: 'AUTH_ANONYMOUS',
				username: 'guest',
				uid: null,
				email: '',
				error: state.error
			};
		case 'AUTH_ERROR':
			return {
				status: 'AUTH_ERROR',
				username: '',
				uid: null,
				email: '',
				error: translateError(action.error)
			};
		default: return state || initialState;
	}
};

