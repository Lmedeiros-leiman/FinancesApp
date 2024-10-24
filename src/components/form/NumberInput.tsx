import React, { useState } from "react"

type NumberInputProps = {
   value: number
   onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
   onBlur? : () => void
   className?: string
   placeholder?: string

}

const NumberInput : React.FC<NumberInputProps> = (props) => {
  const formater = new Intl.NumberFormat(navigator.language || 'en-US')
   const [displayedValue, setDisplayedValue] = useState<string>((formater.format(props.value)));


   const HandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const floatNumber = (e.target.value
         .replace(/[^0-9.-]/g, '')    // removes non-numeric characters, excluding .
         .replace(/(?!^)-/g, '')      // Allow minus only at the start
         .replace(/(\..*)\./g, '$1') // keeps only one decimal point
         .replace(/^0+(?=\d)/, '') ) // removes leading zeros before digits;
      
      setDisplayedValue(floatNumber);
      
      if (props.onChange) {
         const newEvent = {
            ...e,
            target: {
               ...e.target,
               value: floatNumber
            }
         }
         props.onChange(newEvent as React.ChangeEvent<HTMLInputElement>);
      }
      
   }
   const HandleBlur = (_ : React.FocusEvent<HTMLInputElement>) => {
      setDisplayedValue(formater.format(props.value));
      
      if (props.onBlur) {
         props.onBlur();
      }
   }

   return(<>
      <input
         placeholder={props.placeholder}
         className={props.className}
         value={displayedValue}
         onChange={HandleChange}
         onBlur={HandleBlur}
      />
   </>);
}
export default NumberInput;