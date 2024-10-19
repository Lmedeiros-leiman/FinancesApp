import { useContext, useState } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import { Transaction } from "../../Data/Types/Transaction";
import { Database, DatabaseStores } from "../../Data/Database";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { ValidCurrencies } from "../../Data/Selections/CurrenciesByLocales";
import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";


const TransactionCard: React.FC<{ transaction: Transaction }> = (props): JSX.Element => {
   const [busy, setBusy] = useState(false);
   const [transactionData, setTransactionData] = useState(props.transaction);
   const context = useContext(GlobalDataContext) as GlobalDataContextType;


   const backgroundColor = transactionData.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const textColor = transactionData.type == "Expense" ? "red" : "green"
   const icon = transactionData.type == "Expense" ? "pi pi-send" : "pi pi-dollar"
   const transactionDataTime = new Date(transactionData.dateTime)

   const HandleBlur = async () => {
      setBusy(true); //
      const db = await Database.getDB();
      const data = await db.get(DatabaseStores.Finances, transactionData.id)

      if (data) {
         await db.put(DatabaseStores.Finances, transactionData)

         context.UpdateData(prevData => ({
            ...prevData,
            Finances: prevData.Finances.map(t => t.id == data.id ? data : t)
         }));
      }
      setBusy(false);
   }

   return (
      <article className="flex gap-1 flex-wrap max-w-29rem surface-ground p-2 shadow-3 border-round-2xl">
         
         <header className="text-justify flex ">
            <i className={` ${icon} ${backgroundColor} align-content-center border-round-3xl text-4xl p-2 `} />
         </header>
         <section className=" text-justify px-1  sm:w-22rem sm:max-w-22rem">
            <InputText value={transactionData.title} 
               className="border-none text-xl surface-ground"
               onChange={(e) => {
                  setTransactionData(prevData => ({ ...prevData, title: e.target.value }));
               }}
               onBlur={HandleBlur}
            />
            <div>
               <Dropdown  options={Object.keys(ValidCurrencies)}
                  filter value={transactionData.ammountType}
                  className="hidden-input"
                  onChange={(e) => {
                     setTransactionData(prevData => ({ ...prevData, ammountType: e.value }));
                  }}
                  onBlur={HandleBlur}
               />
               <InputNumber className={` hidden-input m-1 p-0 text-lg ${textColor} `}
                  defaultValue={0}
                  value={transactionData.amount} minFractionDigits={0} maxFractionDigits={20}
                  onBlur={HandleBlur}
                  onChange={(e) => {
                     setBusy(true)
                     setTransactionData(prevData => ({ 
                        ...prevData, 
                        type: transactionData.amount < 0 ? "Expense" : "Income",
                        amount: e.value as number }));
                     setBusy(false)
                  }}
               />
            </div>

         </section>
         <aside className=" flex sm:justify-content-start justify-content-end w-full sm:w-min sm:flex-column gap-1">
            <Button icon="pi pi-trash" severity="danger" disabled={busy} outlined
               onClick={async () => {
                  setBusy(true)
                  const db = await Database.getDB();
                  const data = context.data.Finances


                  db.delete(DatabaseStores.Finances, transactionData.id)
                  let indexToDelete = data.findIndex(t => t.id == transactionData.id)
                  context.UpdateData(prevData => ({
                     ...prevData,
                     Finances: data.filter((_, index) => index !== indexToDelete)
                  }));

                  setBusy(false)
               }}>
            </Button>
         </aside>
         <footer className="w-full flex">
            <div className="flex w-full justify-content-end pr-2 text-color-secondary">
               <span>
                  <Calendar touchUI={context.data.User.IsMobile}
                     onChange={(e) => {
                        setBusy(true);
                        console.log((e.value))

                        setTransactionData(prevData => ({ ...prevData, dateTime: (e.value as Date).getTime() }));

                        setBusy(false);
                     }}
                     onBlur={HandleBlur}
                     className="hidden-input" showTime
                     value={transactionDataTime}

                  />
               </span>
            </div>
         </footer>
      </article>);
};
export default TransactionCard