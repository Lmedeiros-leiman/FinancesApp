import { useContext } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";
import ThemePicker from "../components/Configurables/ThemePicker";
import UserSettingSwitches from "../components/Configurables/UserSettingSwitches";
import TreeDataDumper from "../components/Configurables/TreeDataDumper";
import PreferableCurrency from "../components/Configurables/PreferableCurrency";

export default function Configuration() {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   
   return (<section className="flex flex-wrap flex-grow-1 ">
      <div className=" m-1 border-round w-min flex-grow-1 surface-ground  px-2 pb-1 ">
         <div>
            <h2 className="border-bottom-1 border-primary-700 mb-6 pb-2">Appearences</h2>

            <ThemePicker/>
         </div>
         
         <div className="flex flex-wrap gap-2 ">
         <h2 className="border-bottom-1 w-full border-primary-700 mb-1 pb-1">Preferences</h2>
            <div className=" border-round-3xl border-1 border-primary-100 shadow-3 py-2 px-3">
               <UserSettingSwitches />
            </div>
            <div>
               <PreferableCurrency />
            </div>
         
         </div>
         

         
      </div>

      <footer className="flex-grow-1 p-1 w-full surface-ground border-round-xl shadow-6 m-1">
         <span>Debug Data.</span>
         <TreeDataDumper />
      </footer>
   </section>);
}






