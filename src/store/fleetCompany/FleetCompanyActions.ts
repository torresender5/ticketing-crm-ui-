import { SNACKBAR_OPEN } from "store/actions"
import { axiosRequest } from "store/axios"
import { FleetDataProps } from "types"

export const listFleetCompanies = (payload) => ({
    type: 'LIST_FLEET_COMPANY',
    payload,
})

export const addFleetCompany = (payload) => ({
    type: 'ADD_FLEET_COMPANY',
    payload,
})

export const updateFleetCompany = (payload) => ({
    type: 'UPDATE_FLEET_COMPANY',
    payload,
})



//Async functions

export const getFleetRequest = () => {
    return async ( dispatch ) => {
        try {
            const { data } = await axiosRequest('post' , 'transport_unit/get/', {
                    _all_: true,
            })

            dispatch(listFleetCompanies(data.result))
            console.log(data.result)
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexión',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }

}

export const createFleetRequest = (fleetData : FleetDataProps) => {
    return async ( dispatch ) => {
        try {
            const { data } = await axiosRequest('post' , 'transport_unit/create/', (
                fleetData
            ))

            dispatch(addFleetCompany(data.result))
            // console.log(data.result)
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Unidad creada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexión',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }

}


export const updateFleetRequest = (fleetData : FleetDataProps) => {
    return async ( dispatch ) => {
        try {
            const { data } = await axiosRequest('put' , 'transport_unit/update/', (
                    fleetData
            ))

            dispatch(updateFleetCompany(data.result))
             console.log(data.result)
             dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Unidad editada correctamente',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexión',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }

}