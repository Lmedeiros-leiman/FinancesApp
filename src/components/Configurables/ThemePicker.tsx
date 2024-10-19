import { Dropdown } from "primereact/dropdown";
import { FloatLabel } from "primereact/floatlabel";
import { useEffect, useState } from "react"
import { AvailableThemes } from "../../Data/Selections/AvailableThemes";

export const ThemePicker = () => {
   const [selectedTheme, setSelectedTheme] = useState<string>(localStorage.getItem("theme") || "Nova");
   const link = document.getElementById("mainStyle") as HTMLLinkElement;
   useEffect(() => {
      // saves to localstorage and loads the theme.
      localStorage.setItem("theme", selectedTheme);
      link.href = `./styles/${AvailableThemes[selectedTheme as keyof typeof AvailableThemes]}/theme.css`;
   },[selectedTheme]);

   return (<>
      <FloatLabel>
         <Dropdown className="w-10rem"
            value={selectedTheme} filter options={Object.keys(AvailableThemes)}
            onChange={(value) => setSelectedTheme(value.value)}
            placeholder="Select Theme" />
         <label>Theme Used</label>
      </FloatLabel>

   </>)

}
export default ThemePicker