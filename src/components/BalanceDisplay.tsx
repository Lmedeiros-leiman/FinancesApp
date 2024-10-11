import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../Data/GlobalContext"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import "../styles/BalanceDisplay.css"



export default function BalanceDisplay() {
   const formater = new Intl.NumberFormat( navigator.language , {
      currency: "USD",
      style: "currency"
   })
   
   const [hidden, setHidden] = useState(false)
   const [savedValue, setSavedValue] = useState( "Loading..." )
   const data = useContext(GlobalContext)

   useEffect( () => {
      // gets the balance until today and shows it.

      const value = data.data.Finances.reduce((prevData, currData) => { prevData += currData.amount; return prevData }, 0)
      setSavedValue(formater.format(value))
   }, [data.data.Finances]);


   if (data.data.FetchingFinanceData) {
      return (<div>Loading...</div>)
   } 

   return (<div className="flex align-content-center align-items-center gap-1">
      
      
         <InputText className="text-1xl" value={ !hidden && savedValue != "Loading..." ? "Hidden." : savedValue} readOnly /> 
         
      
         <span> 
            <Button onClick={() => setHidden(!hidden)}>
               <i className={hidden ? "pi pi-eye" : "pi pi-eye-slash"} />
            </Button> 
         </span>
   </div>)
}