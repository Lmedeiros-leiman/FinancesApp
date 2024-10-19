import { Dropdown } from "primereact/dropdown";
import { AvailableThemes } from "../Data/Selections/AvailableThemes";
import { useContext, useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";
import ThemePicker from "../components/Configurables/ThemePicker";

export default function Configuration() {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   // user preference for AmmountType (coin type)
   //const [selectedCoinType, setSelectedCoinType] = useState<string>( "USD");
   //const test = MoneyConversionApi.getLatestRates().then((data) => console.log(data));
   
   //const currencyFormater = new Intl.NumberFormat(navigator.language || 'en-US', {
   
   return (<section className="flex flex-wrap ">
      <div className=" m-1 border-round w-min px-3 pb-3 pt-5 surface-ground ">
         <ThemePicker/>
      </div>

      <footer className="flex-grow-1 w-full p-3 surface-ground border-round-xl shadow-6 m-5">
         <span>Debug Data.</span>
         <pre>
            {JSON.stringify(context, null, 2)}
         </pre>
      </footer>
   </section>);
}