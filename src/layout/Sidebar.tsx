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


   return (<div className="flex flex-grow-1 ">
      
      <aside className=" sm:sticky fixed sm:h-screen sm:w-fit w-screen z-5 sm:top-0 top-auto left-0 surface-ground shadow-2 " >
         <nav className="flex sm:flex-column  justify-content-between h-full py-2 px-1 ">
            
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