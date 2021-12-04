import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listAccountTypes = (payload) => ({
    type: 'LIST_ACCOUNT_TYPES',
    payload,
})

// async request
export const getAccountTypesRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'account_types/get/',{
                _all_: true,
            })
            dispatch(listAccountTypes(data.result))
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


