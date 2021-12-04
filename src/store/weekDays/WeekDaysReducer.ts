import { AnyAction } from 'redux'

const DaysReducer = (state = [], action: AnyAction) => {
    switch (action.type) {
        case 'LIST_DAYS':
            return action.payload

        default:
            return state
    }
}

export default DaysReducer
