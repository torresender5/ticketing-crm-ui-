import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TCardsProps } from 'types/index'

export const listRoles = (payload) => ({
    type: 'LIST_ROLES',
    payload,
})

// async request
export const getRolesRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'roles/get/',{
                _all_: true,
            })
            dispatch(listRoles(data.result))
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


