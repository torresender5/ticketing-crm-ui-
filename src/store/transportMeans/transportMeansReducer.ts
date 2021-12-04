import { AnyAction } from 'redux'
// import {  } from '_mockApis/cards/cardsData'
// import { TransportMeans } from '_mockApis/transportMeans/transportMeans'

const transportMeansReducer = (state = [], action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TRANSPORT_MEANS':
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

export default transportMeansReducer