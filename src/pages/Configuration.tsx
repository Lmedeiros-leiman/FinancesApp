import { Dropdown } from "primereact/dropdown";
import { AvailableThemes } from "../Data/Selections/AvailableThemes";
import { useEffect, useState } from "react";


// ./node_modules/primereact/resources/themes/saga-blue/theme.css

export default function Configuration() {
   const [selectedTheme, setSelectedTheme] = useState<string>( localStorage.getItem("theme") || "saga-blue");

   useEffect(() => {
      const themeLink = document.getElementById("mainStyle") as HTMLLinkElement;
      localStorage.setItem("theme", selectedTheme); // saves theme in local storage
      themeLink.href = `./node_modules/primereact/resources/themes/${selectedTheme}/theme.css`;
   },[selectedTheme])
   return (
      <div className="p-1 mt-5 mx-2">
         
         <Dropdown value={selectedTheme} filter
         onChange={(value) => setSelectedTheme(AvailableThemes[value.value as keyof typeof AvailableThemes] )} 
         placeholder="Select Theme" options={Object.keys(AvailableThemes)} />
            {selectedTheme}
      </div>)
}