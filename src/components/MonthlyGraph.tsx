import { useContext } from "react"
import { GlobalContext } from "../Data/GlobalContext"
import { Chart } from "primereact/chart"




export default function MonthlyGraph() {
   const context = useContext(GlobalContext)

   const total = context.data.Finances.reduce((acc, curr) => acc + curr.amount, 0)

   return (<>
      <Chart type="line"  />
   </>)
}
