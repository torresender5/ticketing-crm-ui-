import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { StopsAndZonesProps } from 'types'

export const listStopsAndZones = (payload) => ({
    type: 'LIST_STOPS_ZONES',
    payload,
})

export const addStopsAndZones = (payload) => ({
    type: 'ADD_STOP_ZONE',
    payload,
})

export const updateStopsAndZones = (payload) => ({
    type: 'UPDATE_STOP_ZONE',
    payload,
})

export const deleteStopsAndZones = (payload) => ({
    type: 'DELETE_STOP_ZONE',
    payload,
})

export const getStopsRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'stop/get/', {
                _all_: true,
            })
            dispatch(listStopsAndZones(data.result))
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

export const createStops = (stopData: StopsAndZonesProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'stop/create/',
                stopData
            )
            dispatch(addStopsAndZones(data.result))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Parada creada correctamente',
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

export const updateStops = (stopData: StopsAndZonesProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', 'stop/update/', stopData)
            dispatch(updateStopsAndZones(data.result))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Parada actualizada correctamente',
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

export const deleteStops = (stopData: { id?: string }) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'delete',
                'stop/delete/',
                stopData
            )
            dispatch(deleteStopsAndZones(data.result))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Parada eliminada de manera exitosa',
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
