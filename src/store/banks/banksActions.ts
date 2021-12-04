import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listBanks = (payload) => ({
    type: 'LIST_BANKS',
    payload,
})

// async request
export const getBanksRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'banks/get/',{
                _all_: true,
            })
            dispatch(listBanks(data.result))
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


