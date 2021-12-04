import { AnyAction } from 'redux'
import { initialLoginContextProps } from 'types';


const initialState: initialLoginContextProps = {
    isLoggedIn: Boolean(window.localStorage.getItem('isLoggedIn')) || false,
    isInitialized: false,
    user: null
};

export interface AccountReducerActionProps {
    type: string;
    payload?: initialLoginContextProps;
}

const loginReducer = (state = initialState, action: AnyAction) => {
    switch (action.type) {
        case 'LOGIN_REQUEST':
            // localStorage.setItem('isLoggedIn', 'true')
            return {
                isLoggedIn: true,
                user: action.info,
                content: action.info.content ? action.info.content : null 
            };
        case 'LOGOUT_REQUEST':
            localStorage.removeItem('isLoggedIn');
            return {
                ...state,
                user: action.info,
            };
        default:
            return state;
    }
};

export default loginReducer;
