import { AnyAction } from 'redux'
import { cardsData } from '_mockApis/cards/cardsData'

const cardsReducer = (state = cardsData, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_CARDS':
            return action.payload
        case 'ADD_CARDS':
            return [action.payload, ...state]
        case 'UPDATE_CARDS': {
            const deleteFleet = state.filter(
                (cards) =>
                    cards?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet ]
        }
        default:
            return state
    }
}

export default cardsReducer