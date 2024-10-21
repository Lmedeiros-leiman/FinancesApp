import { Currency, } from "../../Data/Contexts/GlobalDataContext"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"


export interface CurrencyDropDownProps {
   options: {[key: string]: Currency}

   onChange?: (e : DropdownChangeEvent) => void
   onBlur?: () => void | Promise<void> 

   value: Currency
   loading: boolean
   className?: string
}

const CurrencyDropDown: React.FC<CurrencyDropDownProps> = (props) => {
   props.className === undefined ? props.className = "" : props.className
   const DropdownOptions = Object.values(props.options)

   if (props.loading) {
      return(<>
      ...
      </>)
   }

   return (<span>
      
      <Dropdown className={props.className}
         filter loading={props.loading}
         filterBy="name" options={DropdownOptions}
         itemTemplate={(item) => {
            const currency = item as Currency
            return (<>
               <div className="flex gap-2">
                  <aside className="p-1 w-2rem flex justify-content-center  border-round-3xl">
                     {currency.symbol_native || currency.symbol}
                  </aside>
                  <span>{currency.name}</span>
                  <div>
                     {currency.code}
                  </div>
               </div>
            </>);
         }}
         value={props.value}
         valueTemplate={(item) => {
            const currency = item as Currency
            return(<> {currency.symbol_native || currency.symbol} </>)
         }}
         onChange={props.onChange} 
         tooltip="Selected Currency"
         tooltipOptions={{
            position: "top"
         }}
         onBlur={props.onBlur}
         />
         
   </span>)
}
export default CurrencyDropDown;

