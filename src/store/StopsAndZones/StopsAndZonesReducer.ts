import { AnyAction } from 'redux'
import { StopsAndZonesProps } from 'types'
// import { stops } from '../../_mockApis/stops_zones/Route-definition'

const StopsAndZoneReducer = (
    state: Array<StopsAndZonesProps> | undefined = [],
    action: AnyAction
) => {
    switch (action.type) {
        case 'LIST_STOPS_ZONES':
            return action.payload

        case 'ADD_STOP_ZONE':
            return [action.payload, ...state]

        case 'UPDATE_STOP_ZONE': {
            const updateStops = state.filter(
                (stop) => stop.id !== action.payload.id
            )
            return [action.payload, ...updateStops]
        }
        case 'DELETE_STOP_ZONE': {
            const deleteStops = state?.filter(
                (stop) => stop?.id !== action.payload.id
            )
            return deleteStops
        }
        default:
            return state
    }
}

export default StopsAndZoneReducer
