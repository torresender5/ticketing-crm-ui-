import { SNACKBAR_OPEN } from 'store/actions'
import { axiosRequest } from 'store/axios'
// import { TTypesCompany } from 'types/index'

export const listTypesCompany = (payload) => ({
    type: 'LIST_TYPES_COMPANY',
    payload,
})

// export const addTypesCompany = (payload) => ({
//     type: 'ADD_TYPES_COMPANY',
//     payload,
// })

// export const updateTypesCompany = (payload) => ({
//     type: 'UPDATE_TYPES_COMPANY',
//     payload,
// })

// async request
export const getTypesCompanyRequest = () => {

    return async (dispatch) => {
        try{
            const { data } = await axiosRequest('post', 'company_types/get/',{
                _all_: true,
            })
            dispatch(listTypesCompany(data.result))
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

// export const createCardsRequest = (cardsData: TCardsProps ) => {
//     return async (dispatch) => {
//         try{
//             const { data } = await axiosRequest('post', 'company_types/create/', cardsData)
        
//             dispatch(addTypesCompany( data.result))
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Tarjeta creada correctamente',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'success',
//             })
//         } catch (error) {
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Error de conexion',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'error',
//             })
//         }

//     } 
// }

// export const updateCardsRequest = (cardsData: TCardsProps ) => {
//     return async (dispatch) => {
//         try {
//             const { data } = await axiosRequest('put', 'company_types/update/', cardsData)
//             dispatch(updateTypesCompany(data.result))
//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Tarjeta actualizada correctamente',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'success',
//             })
//         } catch (error) {
//             console.log("error update ", error)

//             dispatch({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message: 'Error de conexion',
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'error',
//             })
//         }

//     } 
// }
