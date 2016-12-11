const initialState = {
	username: null,
	uid: null,
	status: 'AUTH_ANONYMOUS',
	email: '',
	error: '',
	firstAccess: true
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
				error: '', 
				firstAccess: true
			};
		case 'AUTH_LOGIN':
			return {
				status: 'AUTH_LOGGED_IN',
				username: action.username,
				uid: action.uid,
				email: action.email,
				error: '',
				firstAccess: true
			};
		case 'AUTH_LOGOUT':
			return {
				status: 'AUTH_ANONYMOUS',
				username: 'guest',
				uid: null,
				email: '',
				error: state.error,
				firstAccess: true
			};
		case 'AUTH_ERROR':
			return {
				status: 'AUTH_ERROR',
				username: '',
				uid: null,
				email: '',
				error: translateError(action.error),
				firstAccess: true
			};
		case 'AUTH_RESET_FIRST_ACCESS':
			return {
				status: 'AUTH_RESET_FIRST_ACCESS',
				username: '',
				uid: null,
				email: '',
				error: '',
				firstAccess: false
			};
		default: return state || initialState;
	}
};

