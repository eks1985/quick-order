const initialState = {
	username: null,
	uid: null,
	status: 'AUTH_ANONYMOUS',
};

export default (state, action) => {
	switch (action.type) {
		case 'AUTH_OPEN':
			return {
				status: 'AUTH_AWAITING_RESPONSE',
				username: 'guest',
				uid: null
			};
		case 'AUTH_LOGIN':
			return {
				status: 'AUTH_LOGGED_IN',
				username: action.username,
				uid: action.uid
			};
		case 'AUTH_LOGOUT':
			return {
				status: 'AUTH_ANONYMOUS',
				username: 'guest',
				uid: null
			};
		default: return state || initialState;
	}
};
