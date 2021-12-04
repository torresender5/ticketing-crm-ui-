import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listState = (payload) => ({
    type: 'LIST_STATE',
    payload,
})

// async request
export const getStateRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'state/get/',{
                _all_: true,
            })
            dispatch(listState(data.result))
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


