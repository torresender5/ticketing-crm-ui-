import { AnyAction } from 'redux'
// import { TTypesCompany } from '_mockApis/cards/cardsData'

const typesCompanyReducer = (state=[] , action: AnyAction) => {
    switch (action.type) {
        case 'LIST_TYPES_COMPANY':
            return action.payload
        case 'ADD_TYPES_COMPANY':
            return [action.payload, ...state]
        // case 'UPDATE_TYPES_COMPANY': {
        //     const deleteFleet = state.filter(
        //         (items) =>
        //             items.id !== action.payload.id
        //     )
        //     return [action.payload, ...deleteFleet]
        // }
        default:
            return state
    }
}

export default typesCompanyReducer