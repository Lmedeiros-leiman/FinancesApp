import { Currency, } from "../../Data/Contexts/GlobalDataContext"
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown"


export interface CurrencyDropDownProps {
   options: {[key: string]: Currency}
   onChange: (e : DropdownChangeEvent) => void

   value: Currency
   loading: boolean
}

const CurrencyDropDown: React.FC<CurrencyDropDownProps> = (props) => {
   
   const DropdownOptions = Object.values(props.options)


   return (<span>
      
      <Dropdown filter loading={props.loading}
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
         />
         
   </span>)
}
export default CurrencyDropDown;

