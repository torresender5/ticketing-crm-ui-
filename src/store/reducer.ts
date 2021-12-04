import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// reducer import
import customizationReducer from './customizationReducer'
import snackbarReducer from './snackbarReducer'
import cartReducer from './cartReducer'
import loginReducer from './loginReducer'
import operatingCompanyReducer from './operatingCompany/operatingCompanyReducer'

import StopsAndZoneReducer from './StopsAndZones/StopsAndZonesReducer'

import usersReducer from './users/usersReducer'
import fleetCompanyReducer from './fleetCompany/fleetCompanyReducer'
import cardsReducer from './cards/cardsReducer'
import typesCompanyReducer from './typesCompany/typesCompanyReducers'
import banksReducer from './banks/banksReducer'
import accountTypesReducer from './account_type/accountTypeReducer'
import stateReducer from './state/stateReducer'
import citiesReducer from './cities/citiesReducer'
import fuelTypeReducer from './fuelTypes/fuelTypesReducer'
import rolesReducer from './roles/rolesReducer'
import SalesReportReducer from './reports/salesReport/SalesReportReducer'
import transportMeansReducer from './transportMeans/transportMeansReducer'

import authorizedRoutesReducer from './operatingCompany/authorizedRoutes/authorizedRoutesReducer'
import DaysReducer from './weekDays/WeekDaysReducer'
import TariffReducer from './tariff_management/TariffReducer'


// ==============================|| COMBINE REDUCER ||============================== //

const reducer = combineReducers({
    login: loginReducer,
    customization: customizationReducer,
    snackbar: snackbarReducer,
    operatingCompanies: operatingCompanyReducer,
    cards: cardsReducer,
    stopsAndZones: StopsAndZoneReducer,
    users: usersReducer,
    fleets: fleetCompanyReducer,
    typesCompany: typesCompanyReducer,
    banks: banksReducer,
    accountTypes: accountTypesReducer,
    stateOptions: stateReducer,
    cities: citiesReducer,
    fuelTypes: fuelTypeReducer,
    roles: rolesReducer,
    sales: SalesReportReducer,
    transportMeans: transportMeansReducer,
    authorizedRoutesReducer: authorizedRoutesReducer,  
    days: DaysReducer,
    fares: TariffReducer,
    
    cart: persistReducer(
        {
            key: 'cart',
            storage,
            keyPrefix: 'berry-',
        },
        cartReducer
    ),
})

export default reducer
