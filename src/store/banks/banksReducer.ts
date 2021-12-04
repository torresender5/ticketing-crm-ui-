import { AnyAction } from 'redux'
// import {  } from '_mockApis/cards/cardsData'
import { BANKS } from 'store/constant'

const banksReducer = (state = BANKS, action: AnyAction) => {
    switch (action.type) {
        case 'LIST_BANKS':
            return action.payload
        // case 'ADD_CARDS':
        //     return [action.payload, ...state]
        // case 'UPDATE_CARDS': {
        //     const deleteFleet = state.filter(
        //         (cards) =>
        //             cards.category !== action.payload.category
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default banksReducer