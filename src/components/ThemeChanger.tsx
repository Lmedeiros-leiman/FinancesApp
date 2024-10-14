import { Dropdown } from "primereact/dropdown";



export function ThemeChanger() {

   const a = [1,2,3,4,5]

   return(<span>
      <Dropdown options={a} value={1}/>
   </span>)
}