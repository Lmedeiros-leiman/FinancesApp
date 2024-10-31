import { Chart } from "primereact/chart";
import { useContext, useEffect, useState } from "react";
import { FinancesContext, FinancesContextType } from "../../Data/Contexts/FinancesContext";
import { ExchangeContext, ExchangeContextType } from "../../Data/Contexts/ExchangeContext";
import { CurrencyContext, CurrencyContextType } from "../../Data/Contexts/CurrencyContext";

type DataPoint = {
   labels: string[]
   datasets: {
      label: string;
      data: number[];
      fill: boolean;
      borderColor: string;
      tension: number;
      backgroundColor: string | null
   }[];
}

export const DataRangeGraph: React.FC<{
   TimeRange: Date[]
}> = (props) => {
   //
   const finances = useContext(FinancesContext) as FinancesContextType;
   const exchange = useContext(ExchangeContext) as ExchangeContextType;
   const currencies = useContext(CurrencyContext) as CurrencyContextType
   //
   const [data, setData] = useState<DataPoint | undefined>( undefined );

   useEffect( () => {
      const startDate = props.TimeRange[0];
      const endDate = props.TimeRange[1];

      const labels : string[] = []

      function getTotalUntilStartDate(startDate: Date) {
         //const keys = Object.keys(finances.data);
         //const startDateKey = startDate.toDateString();
         
         return
      }

      (async () => {
         
         
         console.log((finances.data))

         

      })()

   }, [props.TimeRange])


   return (<span className="w-full flex-grow-1">
      <pre>
         {JSON.stringify(data, null, 2)}
      </pre>
      <Chart options={{maintainAspectRatio: false}} type="line" data={data} />
   </span>);
}
export default DataRangeGraph


/*
import { Chart } from "primereact/chart";
import { useContext, useState } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";


interface DataRangeGraphProps {
   timeRange : [Date, Date | null] | null;
}



const DataRangeGraph : React.FC<DataRangeGraphProps> = (props) => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;
   const [GraphData, setGraphData] = useState("");
   const DataBetweenDates = (startDate: Date, endDate: Date) => {
      return context.data.Finances.filter(t => t.dateTime >= startDate.getTime() && t.dateTime <= endDate.getTime());
   }
   console.log(GraphData)
   console.log(setGraphData)
   const CalculateGraphNodes : any = () => {
      if ( context.data.User.Settings.ShowValues ) {
         return {
            labels: ["","Not Showing Data",""],
            datasets: [{
               label: "Not Showing Data",
               borderColor: "transparent",
               backgroundColor: 'rgba(0,0,0,0)'
            }]
         }
      }
      if (props.timeRange == null) {
         // gets the current day data.
         const StartDate = new Date();
         StartDate.setHours(0,0,0,0)
         const EndDate = StartDate;
         EndDate.setHours(23,59,59,59)
         //

         

         const data = DataBetweenDates(StartDate, EndDate);
         console.log(data)
         return {
            labels: [
               "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
            datasets: [{
               label: "Total",
               data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
               fill: true,
               borderColor: "green",
               tension: 0.4,
               backgroundColor: 'rgba(100,167,38,0.2)'
            }]
         }
      }
      const StartDate = props.timeRange ? props.timeRange[0] : new Date();
      const EndDate = props.timeRange ? props.timeRange[1] : StartDate;

      if (StartDate == EndDate) {
         console.log("Getting specific day data")
      }
      
      console.log(StartDate, EndDate);

      return {
         labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
         datasets: [{
            label: "Total",
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
            fill: true,
            borderColor: "green",
            tension: 0.4,
            backgroundColor: 'rgba(100,167,38,0.2)'
         }]
      }
   }
   


   return (<div className=" surface-100 shadow-3 border-round-2xl p-3 m-1">
      <Chart options={{maintainAspectRatio: false}} type="line" data={CalculateGraphNodes()} />
   </div>);
}
export default DataRangeGraph;

*/