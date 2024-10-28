import { createContext, useState } from "react";
import { Currency } from "../Types/Currency";


export const Usercontext = createContext<UserContextType | null>(null);

export type UserContextType = {
   data : UserConfig,
   setter : React.Dispatch<React.SetStateAction<UserConfig>>,
   busy : boolean,
}

export type UserConfig = {
   IsMobile: boolean
   BaseCurrency: Currency
   Settings: {
      AutoExchange: boolean
      ResetInputFormOnCancel: boolean
      ShowForms: boolean
      ShowValues: boolean
   }
}


export const UserContextProvider : React.FC<{children: React.ReactNode}> = ({children}) => {

   const [userConfigs, setUserConfigs] = useState({
      IsMobile: true,
      BaseCurrency: { "code": "USD", "name": "US Dollar", "decimal_digits": 2, "name_plural": "US dollars", "rounding": 0, "symbol": "$", "symbol_native": "$" },
      Settings : {
         AutoExchange: localStorage.getItem("AutoExchange") !== null,
         ResetInputFormOnCancel: localStorage.getItem("ResetInputFormOnCancel") !== null,
         ShowForms: localStorage.getItem("ShowForms") === null,
         ShowValues: localStorage.getItem("ShowValues") === null,
      }
   });



   return (<Usercontext.Provider value={ {data: userConfigs, setter: setUserConfigs, busy: false} }>
      {children}
   </Usercontext.Provider>)
}
export default UserContextProvider;