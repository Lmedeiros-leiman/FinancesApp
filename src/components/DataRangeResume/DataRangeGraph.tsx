import { Chart } from "primereact/chart";
import { useContext, useEffect, useState } from "react";
import { FinancesContext, FinancesContextType } from "../../Data/Contexts/FinancesContext";
import { ExchangeContext, ExchangeContextType, MoneyExchangeRateResponse } from "../../Data/Contexts/ExchangeContext";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";

type DataPoint = {
   labels: string[]
   datasets: {
      label: string;
      data?: number[];
      fill?: boolean;
      borderColor: string;
      tension?: number;
      backgroundColor: string | null
   }[];
}

export const DataRangeGraph: React.FC<{
   TimeRange: Date[]
}> = (props) => {
   //
   const userSettings = useContext(Usercontext) as UserContextType;
   const finances = useContext(FinancesContext) as FinancesContextType;
   const exchange = useContext(ExchangeContext) as ExchangeContextType;
   //
   const [data, setData] = useState<DataPoint | undefined>(undefined);

   useEffect(() => {
      if (userSettings.data.Settings.ShowValues == false) {
         setData({
            labels: ["", "Not Showing Data", ""],
            datasets: [{
               label: "Not Showing Data",
               borderColor: "transparent",
               backgroundColor: 'rgba(0,0,0,0)'
            }]
         })

         return;
      }
      if (exchange.busy || finances.busy) return;
      const startDate = props.TimeRange[0];
      const endDate = props.TimeRange[1];

      const AmmountUntilStartDate = (() => {
         return Object.keys(finances.data)
            .filter(day => new Date(day) < startDate)
            .reduce((total, day) => {
               const dayTotal = finances.data[day].reduce((total, transaction) => {
                  if (!exchange.busy || exchange.data != undefined) {
                     if (transaction.ammountType.code != userSettings.data.BaseCurrency.code) {
                        return total + transaction.amount / (exchange.data as MoneyExchangeRateResponse).rates[transaction.ammountType.code];
                     }
                  }
                  return total + transaction.amount;
               }, 0);
               return total + dayTotal;
            }, 0)
      })();

      // fetches the data between the start date and the end date
      // 
      let rangedAmmount: number = AmmountUntilStartDate || 0;
      console.log(rangedAmmount)
      let balancePerDay: number[] = [];
      let label: string[] = [];

      for (let selectedDay = new Date(startDate); selectedDay <= endDate; selectedDay.setDate(selectedDay.getDate() + 1)) {

         const day = finances.data[selectedDay.toDateString()] || [];
         const dayTotal = day.reduce((total, transaction) => {
            if (!exchange.busy || exchange.data != undefined) {
               if (transaction.ammountType.code != userSettings.data.BaseCurrency.code) {
                  return total + transaction.amount / (exchange.data as MoneyExchangeRateResponse).rates[transaction.ammountType.code];
               }
            }
            return total + transaction.amount
         }, 0);
         //
         rangedAmmount += dayTotal;
         balancePerDay.push(rangedAmmount);
         label.push(selectedDay.toLocaleDateString());

      }

      setData({
         labels: label,
         datasets: [{
            label: "Total",
            data: balancePerDay,
            fill: true,
            borderColor: "green",
            tension: 0.4,
            backgroundColor: 'rgba(100,167,38,0.2)'
         }]
      })

   }, [props.TimeRange, exchange.busy, finances.busy, userSettings.data.Settings.ShowValues])


   return (<span className="w-full flex-grow-1">
      <Chart options={{ maintainAspectRatio: false }} type="line" data={data} />
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