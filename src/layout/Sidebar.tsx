import { Button } from "primereact/button";
import Home from "../pages/Home";
import { useState } from "react";
import Configuration from "../pages/Configuration";


const Pages: { [key: string]: JSX.Element } = {
   "Home": <Home />,

   "Configuration": <Configuration />,
};


export default function Sidebar() {
   const [selectedPage, setSelectedPage] = useState<string>("Home")

   // <aside className=" sm:sticky fixed sm:h-screen sm:w-fit w-screen z-5  bottom-0 left-0 surface-ground shadow-2 " >

   return (<div className="flex flex-grow-1 ">
      
      <aside className=" sm:w-fit sm:h-screen sm:sticky
            fixed z-5 bottom-0 sm:bottom-auto sm:top-0 left-0 surface-ground shadow-3 w-screen" >
         
         <nav className="flex sm:flex-column justify-content-between h-full py-2 px-1 ">
            
            <span className="flex flex-column gap-1">
               <Button  icon="pi pi-home" onClick={() => setSelectedPage("Home")} />
            </span>
            <Button outlined  icon="pi pi-cog" onClick={() => setSelectedPage("Configuration")} />


         </nav>
      </aside>
      <article className="w-full h-full">
         {Pages[selectedPage]}
      </article>
   </div>)

}