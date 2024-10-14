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


   return (<div className="flex">
      <aside className=" sticky top-0 left-0 h-auto bg-white shadow-2 relative max-h-screen" >
         <nav className="flex flex-column justify-content-between h-full py-2 px-1 ">
            
            <span className="flex flex-column gap-1">
               <Button  icon="pi pi-home" onClick={() => setSelectedPage("Home")} />
               
            </span>



            <Button outlined  icon="pi pi-cog" onClick={() => setSelectedPage("Configuration")} />


         </nav>
      </aside>
      <article>
         {Pages[selectedPage]}

         <div className="bg-green-100  h-5rem w-5rem" style={{ marginTop: "50rem" }}>a</div>
      </article>
   </div>)

}