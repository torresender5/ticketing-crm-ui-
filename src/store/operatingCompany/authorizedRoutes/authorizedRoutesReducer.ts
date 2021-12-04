import { AnyAction } from 'redux'
import { authorizedRoutes } from '_mockApis/authorized_routes/authorizedRoutes'

const authorizedRoutesReducer = (state = authorizedRoutes, action: AnyAction) => {    
    switch (action.type) {
        case 'LIST_AUTHORIZED_ROUTES':
            return action.payload
        case 'ADD_AUTHORIZED_ROUTESY':
            return [action.payload, ...state]
        case 'UPDATE_AUTHORIZED_ROUTES': {
            const deleteCompany = state.filter(
                (routes) =>
                    routes.stop_code !== action.payload.stop_code
            )
            return [action.payload, ...deleteCompany]
        }
        default:
            return state
    }
}

export default authorizedRoutesReducer
