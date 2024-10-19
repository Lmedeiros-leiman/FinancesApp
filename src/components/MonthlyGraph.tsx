import { useContext, useEffect, useState } from "react"
import { Chart } from "primereact/chart"
import { Calendar } from "primereact/calendar"
import { Card } from "primereact/card"
import { FloatLabel } from "primereact/floatlabel"
import { GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext"
import { Skeleton } from "primereact/skeleton"

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


export const MonthlyGraph: React.FC = () => {
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   const pastDays = new Date();
   pastDays.setDate(pastDays.getDate() - 15)
   const [selectedTimeFrame, setSelectedTimeFrame] = useState<[Date, Date | null]>([
      pastDays,
      new Date()
   ]);
   const [validData, setValidData] = useState<DataPoint | undefined>()


   useEffect(() => {
      if (selectedTimeFrame.length < 2) { return; }
      if (selectedTimeFrame[0] == null) { return; }
      if (selectedTimeFrame[1] == null) { return; }

      const startDate = selectedTimeFrame[0];
      const endDate = selectedTimeFrame[1];

      function getAmmountUntilStartDate(startDate: Date) {
         return context.data.Finances
            .filter(t => t.dateTime < startDate.getTime())
            .reduce((prevData, currData) => { prevData.amount += currData.amount; return prevData }, { amount: 0 })
            .amount;
      }
      function getLabels() {
         const currentDate = new Date(startDate)
         const labels: string[] = [];
         while (currentDate <= endDate) {
            labels.push(currentDate.toLocaleDateString(navigator.language))
            currentDate.setDate(currentDate.getDate() + 1)
         }
         return labels;
      }
      const labels = getLabels()
      const labeledHash = labels.reduce((hashMap, label) => {
         return hashMap.set(label, 0);
      }, new Map<string, number>());

      const rangedData = context.data.Finances
         .filter(t => t.dateTime >= startDate.getTime() && t.dateTime <= endDate!.getTime())
         .reduce((hashMap, transaction) => {
            const key = new Date(transaction.dateTime).toLocaleDateString(navigator.language);
            const amount = transaction.amount ?? 0; // default to 0 if amount is undefined/null/NAN
            return hashMap.set(key, (hashMap.get(key) ?? 0) + amount);
         }, new Map<string, number>());

      let AmmountsPerDay: number[] = []
      labeledHash.forEach((_, index) => {

         let Lastdate = new Date(index);
         Lastdate.setDate(Lastdate.getDate() - 1);

         let todayValue = rangedData.get(index) ?? 0
         let PastValue = rangedData.get(Lastdate.toLocaleDateString(navigator.language)) ?? 0

         if (index == startDate.toLocaleDateString(navigator.language)) {
            PastValue += getAmmountUntilStartDate(startDate)
         }

         rangedData.set(index, PastValue + todayValue)
         AmmountsPerDay.push(PastValue + todayValue)
      })


      setValidData({
         labels: labels,
         datasets: [{
            label: "Total",
            data: AmmountsPerDay,
            fill: true,
            borderColor: "green",
            tension: 0.4,
            backgroundColor: 'rgba(100,167,38,0.2)'
         }]
      })

   }, [selectedTimeFrame, context.data.Finances]);


   return (<>

      <Card className=" shadow-3 w-full">
         <header >
            <FloatLabel>
               <Calendar touchUI={context.data.User.IsMobile}
                  value={selectedTimeFrame}
                  selectionMode="range"
                  hideOnRangeSelection
                  variant="outlined"
                  onChange={(e) => { setSelectedTimeFrame(e.value as [Date, Date | null]) }}
               />
               <label>Time range</label>
            </FloatLabel>
         </header>
         <section className="w-full ">
         {
            validData ? 
            <Chart type="line" data={validData} options={{maintainAspectRatio: false}} /> :
            
            <div className="mt-2">
               <Skeleton width="100%" height="5rem" />
            </div>
         }
         </section>
      </Card>
      </>);
};
export default MonthlyGraph;
