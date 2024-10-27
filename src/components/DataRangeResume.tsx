import { useContext, useState } from "react";
import MonthlyGraph from "./MonthlyGraph";
import { FloatLabel } from "primereact/floatlabel";
import { Calendar } from "primereact/calendar";
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";
import DataRangeGraph from "./DataRangeResume/DataRangeGraph";



const DataRangeResume = () => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   // defaults to fething the past 15 days.
   const pastDays = new Date();
   pastDays.setDate(pastDays.getDate() - 15);
   const [timeRange, setTimeRange] = useState<[Date, Date | null] | null>([
      pastDays,
      new Date()
   ]);


   return (<div className="surface-ground p-2 border-round-xl">
      <header>
         <FloatLabel>
            <Calendar touchUI={context.data.User.IsMobile} showButtonBar
               value={timeRange}
               selectionMode="range"
               hideOnRangeSelection
               variant="outlined"
               onChange={(e) => { setTimeRange(e.value as [Date, Date | null]) }}
            />
            <label>Time range</label>
         </FloatLabel>
      </header>
      <DataRangeGraph timeRange={timeRange} />
      <MonthlyGraph />
   </div>);
}

export default DataRangeResume;