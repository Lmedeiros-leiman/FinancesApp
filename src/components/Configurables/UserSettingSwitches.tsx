import { useContext } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import { InputSwitch } from "primereact/inputswitch";



const UserSettingSwitches : React.FC = () => {
   const context = (useContext(GlobalDataContext) as GlobalDataContextType)
   const entries = Object.entries(context.data.User.Settings);


   return(<article>
     {entries.map(([key, value]) => {
        return (
           <div key={key} className="flex gap-1 mb-1 align-items-center">
               <InputSwitch checked={value} value={key} 
                  onChange={(e) => {
                     e.value ? localStorage.setItem(key, "1") : localStorage.removeItem(key)
                     context.UpdateData(prevData => ({
                        ...prevData,
                        User: {
                           ...prevData.User,
                           Settings: {
                              ...prevData.User.Settings,
                              [key]: e.value
                           }
                        }
                     }))
                  }}
               />
               <span>{ key }</span>
           </div>);
     })}
   </article>)
};
export default UserSettingSwitches;
