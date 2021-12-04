import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
import { OperatingCompanyProps } from 'types/index'


export const listOperatingCompanies = (payload) => ({
    type: 'LIST_OPERATING_COMPANIES',
    payload,
})

export const addOperatingCompany = (payload) => ({
    type: 'ADD_OPERATING_COMPANY',
    payload,
})

export const updateOperatingCompany = (payload) => ({
    type: 'UPDATE_OPERATING_COMPANY',
    payload,
})

export const getCompaniesRequest = () => {
    return async (dispatch) => {
        try {
            const { data } = await axiosRequest('post', 'companies/get/', {
                _all_: true,
            })
            console.log("comapny data: ", data.content)
            dispatch(listOperatingCompanies(data.content))
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

export const createCompaniesRequest = (companyData: OperatingCompanyProps) =>{

    return async (dispatch) => {
        try{
            console.log("before_companydate", companyData)
            const { data } = await axiosRequest('post', 'companies/create/', companyData)
            console.log("data_result")

            dispatch(addOperatingCompany(data.content))
            dispatch({
                type:SNACKBAR_OPEN,
                open:true,
                message: 'Empresa creada correctamente',
                anchorOrigin: {vertical: 'top', horizontal: 'right'},
                variant: 'alert',
                alertSeverity:'success',
            })
        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open:true,
                message:'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal: 'right'},
                variant: 'alert',
                alertSeverity: 'error',
            })

        }
    }
}
export const updateCompaniesRequest = (companyData: OperatingCompanyProps) => {
    return async (dispatch) =>{
        try{
            const { data } = await axiosRequest('put','companies/update/', companyData)

            dispatch(updateOperatingCompany(data.content))
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Empresa actualizada correctamente',
                anchorOrigin: {vertical: 'top', horizontal: 'right'},
                variant: 'alert',
                alertSeverity: 'success',
            })

        } catch (error) {
            dispatch({
                type: SNACKBAR_OPEN,
                open: true,
                message: 'Error de conexion',
                anchorOrigin: { vertical: 'top', horizontal:'right'},
                variant: 'alert',
                alertSeverity: 'error',
            })
        }
    }
}
