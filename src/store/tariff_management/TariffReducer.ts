import { AnyAction } from 'redux'
import { fareProps } from 'types/index'

const TariffReducer = (
    state: Array<fareProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_TARIFF':
            return action.payload
        case 'ADD_TARIFF':
            return [action.payload, ...state]
        case 'UPDATE_TARIFF': {
            const deleteTariff = state?.filter(
                (fare) => fare?.id !== action.payload.id
            )
            return [action.payload, ...deleteTariff]
        }
        default:
            return state
    }
}

export default TariffReducer
