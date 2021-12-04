import { createStore, applyMiddleware } from 'redux'
import { persistStore } from 'redux-persist'
import reducer from './reducer'
import { compose } from 'redux'
import thunk from 'redux-thunk'
// import { GetCookieWebConfig } from './loginActions'
// import { axiosRequest } from './axios'
// import { loginRequest } from './loginActions'
// import { type } from 'os'
// import { SNACKBAR_OPEN } from './actions'
// import { loginRequest } from './loginActions'

// ==============================|| REDUX - MAIN STORE ||============================== //

// const middlewareWebConfig = store => next => async action => {
//     console.log('current state in middle',store.getState())
//     const {data} = await axiosRequest('get', 'GetCookieWebConfig/', {})
//     console.log(data)
//     if(store.getState().login.isLoggedIn){

//         return axiosRequest('get', 'GetCookieWebConfig/', {})
//         .then(
//             res => next(loginRequest(res)),
//             error => next({
//                 type: SNACKBAR_OPEN,
//                 open: true,
//                 message:error.message,
//                 anchorOrigin: { vertical: 'top', horizontal: 'right' },
//                 variant: 'alert',
//                 alertSeverity: 'error',
//             })
//         )

//     }
//     return next(action)
// }




declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const middleware = [ thunk]
const store = createStore(reducer, composeEnhancers(applyMiddleware(...middleware)))
const persister = persistStore(store)

// function middlewareWebConfig(){
//     return function(dispatch){
//             return dispatch(GetCookieWebConfig())
//     }
// }

// store.dispatch(middlewareWebConfig())


export { store, persister }
