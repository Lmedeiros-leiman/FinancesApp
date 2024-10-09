import { useContext, useEffect, useState } from "react"
import { GlobalContext } from "../Data/GlobalContext"
import { InputText } from "primereact/inputtext"
import { Button } from "primereact/button"




export default function BalanceDisplay() {
   const [hidden, setHidden] = useState(false)
   const [visibleValue, setVisibleValue] = useState("");
   const data = useContext(GlobalContext)

   useEffect( () => {
      // gets the balance until today and shows it.
   }, [data.data.Finances])

   if (data.data.FetchingFinanceData) {
      return (<div>Loading...</div>)
   } 

   return (<div>
      <i className="pi pi-eye"></i>
      <i className="pi pi-eye-slash"></i>
      <InputText value={visibleValue} readOnly /> <span> <Button><i className="pi pi-eye"></i></Button> </span>
   </div>)
}