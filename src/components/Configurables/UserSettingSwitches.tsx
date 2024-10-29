import { useContext } from "react";
import { InputSwitch } from "primereact/inputswitch";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";



const UserSettingSwitches: React.FC = () => {
   const userConfigs = useContext(Usercontext) as UserContextType;
   const entries = Object.entries(userConfigs.data.Settings);


   return (<article>
      {entries.map(([key, value]) => {
         return (
            <div key={key} className="flex gap-1 mb-1 align-items-center">
               <InputSwitch checked={value} value={key}
                  onChange={(e) => {
                     e.value ? localStorage.setItem(key, "1") : localStorage.removeItem(key)
                     userConfigs.setter(prevData => ({
                        ...prevData,
                        Settings: {
                           ...prevData.Settings,
                           [key]: e.value
                        }
                     }))
                  }}
               />
               <span>{key}</span>
            </div>);
      })}
   </article>)
};
export default UserSettingSwitches;
