import { useContext, useState } from "react";
import CurrencyDropDown from "../form/CurrencyDropDown";
import { FetchLocaleCurrency, Usercontext, UserContextType } from "../../Data/Contexts/UserContext";
import { Currency, CurrencyContext, CurrencyContextType } from "../../Data/Contexts/CurrencyContext";


const PreferableCurrency : React.FC = () => {
   const userConfig = useContext(Usercontext) as UserContextType;
   const currencies = useContext(CurrencyContext) as CurrencyContextType;


   const [busy, setBusy] = useState(false);
   return(<>
      <div>
         <label>Preferable Currency </label>
      </div>
      <CurrencyDropDown loading={currencies.busy || busy}
         options={currencies.data} showClear={!busy}
         value={userConfig.data.BaseCurrency} 
         valueTemplate={(item) => {
            return (<> {item.symbol_native} | {item.name}</>)
         }}
         onChange={async (e) => {
            setBusy(true);
            let newCurrency = e.value as Currency | undefined;
            
            if (e.value == undefined) {
               newCurrency = await FetchLocaleCurrency(navigator.language || "en-US")
            }
            
            userConfig.setter(prevData => ({
               ...prevData,
               BaseCurrency: newCurrency as Currency
            }));
            setBusy(false);
         }}
      />
   </>)
}
export default PreferableCurrency;