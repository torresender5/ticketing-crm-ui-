import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'

export const listDays = (payload) => ({
    type: 'LIST_DAYS',
    payload,
})

// async request
export const getDaysRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest(
                'post',
                'applicable_weekday/get/',
                {
                    _all_: true,
                }
            )
            dispatch(listDays(data.content))
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
