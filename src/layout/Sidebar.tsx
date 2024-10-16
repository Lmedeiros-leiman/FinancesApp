import { Button } from "primereact/button";
import Home from "../pages/Home";
import { useState } from "react";
import Configuration from "../pages/Configuration";
import "../styles/Sidebar.css"


const Pages: { [key: string]: JSX.Element } = {
   "Home": <Home />,

   "Configuration": <Configuration />,
};


export default function Sidebar() {
   const [selectedPage, setSelectedPage] = useState<string>("Home")


   return (<div className="flex h-screen max-h-screen">
      <span className="w-3rem bg-red-100"></span>
      <aside className=" fixed h-full z-5 top-0 left-0 bg-white shadow-2 " >
         <nav className="flex flex-column justify-content-between h-full py-2 px-1 ">
            
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