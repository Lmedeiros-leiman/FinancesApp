import { useContext, useState } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import { Transaction } from "../../Data/Types/Transaction";
import { Database, DatabaseStores } from "../../Data/Database";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";

import { InputNumber } from "primereact/inputnumber";
import { Calendar } from "primereact/calendar";
import CurrencyDropDown from "../form/CurrencyDropDown";


const TransactionCard: React.FC<{ transaction: Transaction }> = (props): JSX.Element => {
   const [busy, setBusy] = useState(false);
   const [transactionData, setTransactionData] = useState(props.transaction);
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   const backgroundColor = transactionData.type == "Expense" ? "bg-red-200" : "bg-green-200"
   const borderColor = transactionData.type == "Expense" ? "border-red-300" : "border-green-300"
   //const textColor = transactionData.type == "Expense" ? "red" : "green"
   const icon = transactionData.type == "Expense" ? "pi pi-send" : "pi pi-dollar"
   const transactionDataTime = new Date(transactionData.dateTime)

   const HandleBlur = async () => {
      setBusy(true); //
      const db = await Database.getDB();
      const data = await db.get(DatabaseStores.Finances, transactionData.id)

      if (data) {
         await db.put(DatabaseStores.Finances, transactionData)
         const updatedDatabase = await db.getAll(DatabaseStores.Finances)
         context.UpdateData(prevData => ({
            ...prevData,
            Finances: updatedDatabase
         }));
      }
      setBusy(false);
   }

   const confirmAction = async () => {
      
      const confirmation = confirm("Are you sure you want to delete this transaction?");

      if (confirmation) {
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
         confirm("Transaction deleted!")
      }
   }

   return (
      <article className={` border-1 ${borderColor} flex gap-1 flex-wrap max-w-30rem surface-ground p-2 shadow-3 border-round-2xl `}>

         <header className={`  text-justify flex justify-content-between w-full `}>
            <i className={` ${icon} ${backgroundColor}  align-content-center border-round-3xl text-4xl p-2 `} />

            <span>
               <Button className="align-self-end" icon="pi pi-trash" severity="danger" disabled={busy} outlined
                  onClick={confirmAction} />
            </span>
         </header>
         <section className=" text-justify px-1 flex flex-column flex-grow-1 gap-1 ">
            <InputText value={transactionData.title}
               className="border-none text-xl surface-ground"
               onChange={(e) => {
                  setTransactionData(prevData => ({ ...prevData, title: e.target.value }));
               }}
               onBlur={HandleBlur}
            />
            <div className="flex gap-1 justify-content-start align-items-center">
               <CurrencyDropDown className="hidden-input "
                  loading={context.data.FetchingCurrencies}
                  options={context.data.ValidCurrencies}
                  value={transactionData.ammountType}
                  onChange={(e) => {
                     setTransactionData(prevData => ({ ...prevData, ammountType: e.value }));
                  }}
                  onBlur={HandleBlur}
               />

               <InputNumber className=" hidden-input "
                  defaultValue={0}
                  value={transactionData.amount} minFractionDigits={0} maxFractionDigits={20}
                  onBlur={HandleBlur}
                  onChange={(e) => {
                     setBusy(true);
                     setTransactionData(prevData => ({
                        ...prevData,
                        amount: e.value == null ? 0 : e.value,
                        type: e.value == null ? "Expense" : e.value <= 0 ? "Expense" : "Income",
                     }));
                     setBusy(false);
                  }}
               />
            </div>

         </section>

         <footer className="w-full flex justify-content-between">
            <div className="flex w-full justify-content-end pr-2 text-color-secondary">
               <span>
                  <Calendar touchUI={context.data.User.IsMobile}
                     onChange={(e) => {
                        setBusy(true);
                        setTransactionData(prevData => ({ ...prevData, dateTime: (e.value as Date).getTime() }));
                        setBusy(false);
                     }}
                     onBlur={HandleBlur}
                     className="hidden-input" showTime
                     value={transactionDataTime} />
               </span>
            </div>
         </footer>
      </article>);
};
export default TransactionCard