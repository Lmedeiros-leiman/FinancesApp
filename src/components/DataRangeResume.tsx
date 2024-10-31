import { useContext, useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Usercontext, UserContextType } from "../Data/Contexts/UserContext";
import { Nullable } from "primereact/ts-helpers";
import DataRangeGraph from "./DataRangeResume/DataRangeGraph";
import DataRangeCards from "./DataRangeResume/DataRangeCards";
import InputTransaction from "./TransactionRelated/InputTransaction";




const DataRangeResume = () => {
   const userConfig = useContext(Usercontext) as UserContextType;


   const [selectedDataRange, setSelectedDataRange] = useState<Nullable<(Date | null)[]>>((() => {
      const now = new Date();
      const defaultPastDate = new Date();
      defaultPastDate.setDate(defaultPastDate.getDate() - 30);
      return [defaultPastDate, now]
   })());
   const [targetRange, setTargetRange] = useState<Date[]>(selectedDataRange as Date[]);

   useEffect( () => {
      if (selectedDataRange === null || selectedDataRange === undefined) {return;}
      if (selectedDataRange[0] === null || selectedDataRange[1] === null) {return;}
      setTargetRange(selectedDataRange as Date[]);

   },[selectedDataRange])
   const HandleClear = () => {
      const now = new Date();
      const defaultPastDate = new Date();
      defaultPastDate.setDate(defaultPastDate.getDate() - 30);
      setTargetRange([now, defaultPastDate])
   }

   return (<>
      <header className="w-full ">
         <section className="px-1 flex justify-content-between align-items-center ">
            <span className="">
               <div className="text-color-secondary text-sm">Selected Time Range</div>
               <Calendar touchUI={userConfig.data.IsMobile}
                  value={selectedDataRange} showButtonBar
                  onChange={(e) => { setSelectedDataRange(e.value as []); }}
                  selectionMode="range" onClearButtonClick={HandleClear}
                  hideOnRangeSelection showIcon iconPos="left"
                  variant="outlined" dateFormat="dd/mm/yy"
               />
            </span>
            
            <span className="pt-3">
               <InputTransaction />
            </span>

            
         </section>
      </header>
      <section className="w-full surface-100 border-round p-1 mt-1">
         <DataRangeCards TimeRange={targetRange} />
      </section>
      <section className="w-full surface-100 border-round p-1 mt-1">
         <DataRangeGraph TimeRange={targetRange} />
      </section>
      
   </>);
}

export default DataRangeResume;