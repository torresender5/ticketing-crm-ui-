import { AnyAction } from 'redux'
import { company } from '_mockApis/operating_companies/create_company'

const operatingCompanyReducer = (state = company, action: AnyAction) => {    
    switch (action.type) {
        case 'LIST_OPERATING_COMPANIES':
            return action.payload
        case 'ADD_OPERATING_COMPANY':
            return [action.payload, ...state]
        case 'UPDATE_OPERATING_COMPANY': {
            const deleteCompany = state.filter(
                (company) =>
                    company.company_code !== action.payload.company_code
            )
            return [action.payload, ...deleteCompany]
        }
        default:
            return state
    }
}

export default operatingCompanyReducer
