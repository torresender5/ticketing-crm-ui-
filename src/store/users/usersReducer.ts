import { AnyAction } from 'redux'
import { UserProps } from 'types/index'
// import { users } from '_mockApis/user-profile/user_create'

// const users: any = []

const usersReducer = ( state: Array <UserProps> | undefined  = [], action: AnyAction) => {
    switch (action.type) {
        case 'LIST_USERS':
            return action.payload
        case 'ADD_USER':
            return [action.payload, ...state]
        case 'UPDATE_USER': {
            const deleteUser = state?.filter(
                (user) => user?.id !== action.payload.id
            )
            return [action.payload, ...deleteUser]
        }
        default:
            return state
    }
}

export default usersReducer
