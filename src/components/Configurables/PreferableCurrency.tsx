import { useContext, useState } from "react";
import { Currency, FetchLocaleCurrency, GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import CurrencyDropDown from "../form/CurrencyDropDown";


const PreferableCurrency : React.FC = () => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;
   const [busy, setBusy] = useState(false);
   return(<>
      <div>
         <label>Preferable Currency </label>
      </div>
      <CurrencyDropDown loading={context.data.FetchingCurrencies || busy}
         options={context.data.ValidCurrencies} showClear={!busy}
         value={context.data.User.BaseCurrency} 
         valueTemplate={(item) => {
            return (<> {item.symbol_native} | {item.name}</>)
         }}
         onChange={async (e) => {
            setBusy(true);
            let newCurrency = e.value as Currency | undefined;
            
            if (e.value == undefined) {
               newCurrency = await FetchLocaleCurrency(navigator.language || "en-US")
            }
            
            context.UpdateData(prevData => ({
               ...prevData,
               User: {
                  ...prevData.User,
                  BaseCurrency: newCurrency as Currency
               }
            }))
            setBusy(false);
         }}
      />
   </>)
}
export default PreferableCurrency;