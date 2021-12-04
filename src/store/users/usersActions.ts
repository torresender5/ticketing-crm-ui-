import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { UserEdit, UserTry } from 'types/index'

export const listUsers = (payload) => ({
    type: 'LIST_USERS',
    payload,
})

export const addUser = (payload) => ({
    type: 'ADD_USER',
    payload,
})

export const updateUser = (payload) => ({
    type: 'UPDATE_USER',
    payload,
})

export const rolUser = (payload) => ({
    type:'ROLE_USER',
    payload,
})

// Async functions
export const getUsersRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'employees/get/', {
                _all_: true,
            })
            dispatch(listUsers(data.result))
            // console.log(data.result)
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

export const createUserRequest = (userData: UserTry) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'employees/create_user/', (
                userData
            ))
            dispatch(addUser(data.result))
            // console.log(data.result)
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Usuario creado correctamente',
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
            // console.log(error)
        }
    }
}

export const updateUserRequest = (userData: UserEdit) => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('put', '/employees/update/', (
                userData
            ))
            dispatch(updateUser(data.result))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Usuario actualizado correctamente',
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

export const getRoleUser = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'roles/get/', {
                _all_: true,
            })
            dispatch(rolUser(data.result))
            console.log(data.result)
        } catch (error) {
            // dispatch({
            //     type: SNACKBAR_OPEN,
            //     open: true,
            //     message: 'Error de conexión',
            //     anchorOrigin: { vertical: 'top', horizontal: 'right' },
            //     variant: 'alert',
            //     alertSeverity: 'error',
            // })
            console.log(error)
        }
    }
}