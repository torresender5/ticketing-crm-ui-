import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listCities = (payload) => ({
    type: 'LIST_CITIES',
    payload,
})

// async request
export const getCitiesRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'cities/get/',{
                _all_: true,
            })
            dispatch(listCities(data.result))
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


