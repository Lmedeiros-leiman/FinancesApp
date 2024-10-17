import { useContext, useEffect, useState } from "react"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"
import "../styles/BalanceDisplay.css"
import { Skeleton } from "primereact/skeleton"
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext"



export default function BalanceDisplay() {
   const formater = new Intl.NumberFormat( navigator.language , {
      currency: "USD",
      style: "currency"
   })
   
   const [hidden, setHidden] = useState(false)
   const [savedValue, setSavedValue] = useState( "Loading..." )
   const data = useContext(GlobalDataContext) as GlobalDataContextType

   useEffect( () => {
      // gets the balance until today and shows it.

      const value = data.data.Finances.reduce((prevData, currData) => { prevData += currData.amount; return prevData }, 0)
      setSavedValue(formater.format(value))
   }, [data.data.Finances]);


   if (data.data.FetchingFinanceData) {
      return (<span className="flex gap-1">
         <Skeleton className="w-10rem h-2rem"/>
         <Skeleton className="w-2rem h-2rem"/>
      </span>)
   } 

   return (<span className="flex gap-1">
         <InputText className="text-1xl" value={ !hidden && savedValue != "Loading..." ? "Hidden." : savedValue} readOnly /> 
         
         <Button onClick={() => setHidden(!hidden)}>
            <i className={hidden ? "pi pi-eye" : "pi pi-eye-slash"} />
         </Button> 
   </span>)
}