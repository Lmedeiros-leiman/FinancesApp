import { useContext, useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";
import { Nullable } from "primereact/ts-helpers";
import DataRangeGraph from "./DataRangeGraph";
import DataRangeCards from "./DataRangeCards";
import InputTransaction from "../TransactionRelated/InputTransaction";
import { Button } from "primereact/button";




const DataRangeResume = () => {
   const userConfig = useContext(Usercontext) as UserContextType;

   const [showingData, setShowingData] = useState<boolean>(userConfig.data.Settings.ShowValues);
   const [selectedDataRange, setSelectedDataRange] = useState<Nullable<(Date | null)[]>>((() => {
      const now = new Date();
      const defaultPastDate = new Date();
      defaultPastDate.setDate(defaultPastDate.getDate() - 30);
      return [defaultPastDate, now]
   })());
   const [targetRange, setTargetRange] = useState<Date[]>(selectedDataRange as Date[]);

   useEffect(() => {
      if (selectedDataRange === null || selectedDataRange === undefined) { return; }
      if (selectedDataRange[0] === null || selectedDataRange[1] === null) { return; }
      setTargetRange(selectedDataRange as Date[]);

   }, [selectedDataRange])
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
               <span className="mx-1">
                  <Button icon={` ${!showingData ? "pi pi-eye-slash" : "pi pi-eye"} `} className={" " + " p-button-text"}
                     onClick={() => {
                        showingData ? localStorage.setItem("showValues", "1") : localStorage.removeItem("showValues");
                        setShowingData(!showingData)

                        userConfig.setter((PrevData) => ({
                           ...PrevData,
                           Settings: {
                              ...PrevData.Settings,
                              ShowValues: !showingData
                           }
                        }));

                     }}
                  />
               </span>
            </span>
            <span>
               <InputTransaction />
            </span>


         </section>
      </header>
      <section className="w-full  p-1 mt-1">
         <DataRangeCards TimeRange={targetRange} />
      </section>
      <section className="w-full flex flex-grow-1 surface-100 border-round p-1 mt-1">
         <DataRangeGraph TimeRange={targetRange} />
      </section>

   </>);
}

export default DataRangeResume;