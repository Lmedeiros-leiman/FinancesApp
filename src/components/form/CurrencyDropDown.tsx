import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"
import { Currency } from "../../Data/Contexts/CurrencyContext"


export interface CurrencyDropDownProps {
   showClear? : boolean
   loading? : boolean

   options: {[key: string]: Currency}

   onChange?: (e : DropdownChangeEvent) => void
   onBlur?: () => void | Promise<void> 

   value: Currency
   className?: string

   valueTemplate? : (item: Currency) => JSX.Element
}

const CurrencyDropDown: React.FC<CurrencyDropDownProps> = (props) => {
   const DropdownOptions = Object.values(props.options)

   if (props.loading) {
      return(<>
      ...
      </>)
   }

   return (<span>
      
      <Dropdown className={props.className} showClear={props.showClear}
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
         valueTemplate={props.valueTemplate ?? 
            ( (item : Currency) => <> {item.symbol_native || item.symbol} </>)
         }
         onChange={props.onChange} 
         tooltip={`${props.value.name}`}
         tooltipOptions={{
            position: "top"
         }}
         onBlur={props.onBlur}
         />
         
   </span>)
}
export default CurrencyDropDown;
