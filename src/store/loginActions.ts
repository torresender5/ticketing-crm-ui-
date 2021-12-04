
import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { TLoginDataProps } from 'types'

// const initialValues = {
//     email: 'info@codedthemes.com',
//     password: '123456',
//     submit: null
// }
export const loginRequest = (payload: any) => {
    return {
        type: 'LOGIN_REQUEST',
        info: {
            ...payload,
            // isLoggedIn: true,
            // username:'prueba@gmail.com',
            // user:'prueba',
        },
    }
}

export const logoutRequest = (payload: any) => {
    return {
        type: 'LOGOUT_REQUEST',
        info: {
            ...payload,
            isLoggedIn: false,
            user: null,
        },
    }
}

export const getLoginRequest = (auth: TLoginDataProps) =>{
    return async (dispatch) => {
        try {
            console.log('loginData', auth)
            const {data} = await axiosRequest('post','login/',auth)

            console.log('user', data)
            if(data.message === 'Operación Exitosa'){
                dispatch(loginRequest(data))
            }else{
                dispatch({
                    type: SNACKBAR_OPEN,
                    open: true,
                    message:data.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'alert',
                    alertSeverity: 'error',
            })
                
            }
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
export const removeLoginRequest = () => {
    return async (dispatch) => {
        try {
            
            dispatch(logoutRequest({}))
        } catch (error){

            dispatch({ 
                type: SNACKBAR_OPEN,
                open:true,
                message : 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'álert',
                alertSeverity:'error',

            })
        }
    }
}

export const GetCookieWebConfig = () => {
    return async (dispatch) =>{
        try{
            const { data } = await axiosRequest('get', 'GetCookieWebConfig/',{})
            .then(
                result => dispatch(loginRequest(result)),
                error =>  dispatch({ 
                    type: SNACKBAR_OPEN,
                    open:true,
                    message : error.message,
                    anchorOrigin: { vertical: 'top', horizontal: 'right' },
                    variant: 'álert',
                    alertSeverity:'error',
    
                })
            )
            dispatch(loginRequest(data))
        } catch (error) {
            dispatch({ 
                type: SNACKBAR_OPEN,
                open:true,
                message : 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right' },
                variant: 'álert',
                alertSeverity:'error',

            })
        }
    }
}
