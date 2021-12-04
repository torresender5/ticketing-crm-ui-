import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { fareProps } from 'types/index'

export const listTariff = (payload) => ({
    type: 'LIST_TARIFF',
    payload,
})

export const addTariff = (payload) => ({
    type: 'ADD_TARIFF',
    payload,
})

export const updateTariff = (payload) => ({
    type: 'UPDATE_TARIFF',
    payload,
})

// Async functions
export const getTariffRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'fare/get/', {
                _all_: true,
            })
            dispatch(listTariff(data.content))
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

export const createTariffRequest = (tarifData: fareProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'fare/create/',
                tarifData
            )
            dispatch(addTariff(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tarifa creada correctamente',
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

export const updateTariffRequest = (tarifData: fareProps) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'put',
                'fare/update/',
                tarifData
            )
            dispatch(updateTariff(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Tarifa actualizada correctamente',
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
