export const UserReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN_START":
            return {
                user: null,
                isFetching: true,
                loginError: false
            };
        case "LOGIN_SUCCESS":
            return {
                user: action.payload,
                isFetching: false,
                loginError: false
            };
        case "LOGIN_FAILURE":
            return {
                user: null,
                isFetching: false,
                loginError: true
            };
        case "LOGOUT_USER":
            return {
                user: null,
                isFetching: false,
                loginError: false
            };

        default:
            return state;
    }
}

export default UserReducer;