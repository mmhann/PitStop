const initialUserReducer = {
    loading: true,
    authenticated: false,
    user: [],
    details: {
        firstname: '',
        lastname: ''
    }
}

const userReducer = function user(state = initialUserReducer, action) {
    switch (action.type) {

        case 'SET_USER':
            return {
                ...state,
                authenticated: true,
                user: action.user
            }

        case 'UNSET_USER':
            return {
                ...state,
                loading: false,
                authenticated: false,
                user: [],
                details: {
                    firstname: '',
                    lastname: ''
                }
            }

        case 'SET_USER_DETAILS':
            return {
                ...state,
                loading: false,
                details: action.details
            }

        default: return state

    }
}

export default userReducer
