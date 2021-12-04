import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listTransportMeans = (payload) => ({
    type: 'LIST_TRANSPORT_MEANS',
    payload,
})

// async request
export const getTransportMeansRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'transport_means/get/',{
                _all_: true,
            })
            dispatch(listTransportMeans(data.result))
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


