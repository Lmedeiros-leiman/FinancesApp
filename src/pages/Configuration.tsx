import { Dropdown } from "primereact/dropdown";
import { AvailableThemes } from "../Data/Selections/AvailableThemes";
import { useContext, useEffect, useState } from "react";
import { FloatLabel } from "primereact/floatlabel";
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";

export default function Configuration() {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;
   const [selectedTheme, setSelectedTheme] = useState<string>( localStorage.getItem("theme") ||"Nova");
   useEffect(() => {
      // ./node_modules/primereact/resources/themes/{ThemeFolder}/theme.css
      //const themeValue = AvailableThemes[selectedTheme as keyof typeof AvailableThemes];
      //console.log(selectedTheme)
      //localStorage.setItem("theme", selectedTheme); // saves theme in local storage
      //(document.getElementById("mainStyle") as HTMLLinkElement).href = `./node_modules/primereact/resources/themes/${themeValue}/theme.css`;
   },[selectedTheme]);
   

   // user preference for AmmountType (coin type)
   //const [selectedCoinType, setSelectedCoinType] = useState<string>( "USD");
   //const test = MoneyConversionApi.getLatestRates().then((data) => console.log(data));
   
   //const currencyFormater = new Intl.NumberFormat(navigator.language || 'en-US', {
   
   return (<section className="flex flex-wrap ">
      <div className=" m-1 border-round w-min px-3 pb-3 pt-5 surface-ground ">
         <FloatLabel>
            <Dropdown className="w-10rem"
            value={selectedTheme} filter  options={Object.keys(AvailableThemes)}
            onChange={(value) => setSelectedTheme(value.value)} 
            placeholder="Select Theme"  />
            <label>Curent Theme</label>
         </FloatLabel>
      </div>
      {selectedTheme}

      <div className="surface-ground px-3 pb-3 pt-5 m-1 border-round">
         Prefered Base Coin

      </div>

      <footer className="flex-grow-1 w-full p-3 surface-300 shadow-6 m-5">
         <span>Debug Data.</span>
         <pre>
            {JSON.stringify(context, null, 2)}
         </pre>
      </footer>
   </section>);
}