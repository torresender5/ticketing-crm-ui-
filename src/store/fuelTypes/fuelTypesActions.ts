import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listFuelTypes = (payload) => ({
    type: 'LIST_FUEL_TYPES',
    payload,
})

// async request
export const getFuelTypesRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'fuel_type/get/',{
                _all_: true,
            })
            dispatch(listFuelTypes(data.result))
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}


