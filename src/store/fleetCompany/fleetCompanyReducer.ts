import { AnyAction } from 'redux'
import { FleetDataProps } from 'types/index'
// import { FleetData } from '_mockApis/transportation_unit/FleetData'

const fleetCompanyReducer = (state: Array<FleetDataProps> | undefined = [] , action: AnyAction) => {
    switch (action.type) {
        case 'LIST_FLEET_COMPANY':
            return action.payload
        case 'ADD_FLEET_COMPANY':
            return [action.payload, ...state]
        case 'UPDATE_FLEET_COMPANY': {
            const deleteFleet = state?.filter(
                (fleet) =>
                    fleet?.id !== action.payload.id
            )
            return [action.payload, ...deleteFleet]
        }
        default:
            return state
    }
}

export default fleetCompanyReducer