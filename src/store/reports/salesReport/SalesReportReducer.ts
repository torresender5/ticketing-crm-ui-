import { AnyAction } from "redux"



const SalesReportReducer = (state = [] , action:AnyAction) => {
        switch (action.type) {
            case 'LIST_SALES_REPORT' :
                return action.payload
                    
                
        
            default:
              return state;
        }

}

export default SalesReportReducer