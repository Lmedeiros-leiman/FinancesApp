import { useContext, useState } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import { Transaction } from "../../Data/Types/Transaction";
import { Database, DatabaseStores } from "../../Data/Database";
import { Button } from "primereact/button";

import { Calendar } from "primereact/calendar";
import CurrencyDropDown from "../form/CurrencyDropDown";
import NumberInput from "../form/NumberInput";


const TransactionCard: React.FC<{ transaction: Transaction }> = (props): JSX.Element => {
   const [busy, setBusy] = useState(false);
   const [transactionData, setTransactionData] = useState(props.transaction);
   const context = useContext(GlobalDataContext) as GlobalDataContextType;

   const ShowData = context.data.User.ShowValues;
   //
   const backgroundColor = transactionData.amount < 0 ? "bg-red-300" : transactionData.amount > 0 ? "bg-green-300" : "bg-gray-300"
   const borderColor = transactionData.amount < 0 ? "border-red-700" : transactionData.amount > 0 ? "border-green-700" : "border-gray-300"
   const textColor = transactionData.amount < 0 ? "text-red-700" : transactionData.amount > 0 ? "text-green-700" : ""
   const icon = transactionData.amount < 0 ? "pi pi-send" : transactionData.amount > 0 ? "pi  pi-dollar" : "pi pi-arrow-down"

   const inputVisibility = context.data.User.ShowForms ? "" : "hidden-input";

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

   return (<article className={`surface-ground p-1 py-2 flex w-full max-w-25rem flex-wrap  border-1 ${borderColor} shadow-3 border-round relative`}>
      <header className="flex px-1 justify-content-between align-content-center w-full gap-1 ">
         <i className={` ${icon} ${backgroundColor} border-round-3xl text-4xl p-2 `} />
         <section className=" flex w-full gap-1 my-auto ">
            <input placeholder="Transaction Title" value={transactionData.title}
               onChange={(e) => { setTransactionData(prevData => ({ ...prevData, title: e.target.value })) }}
               onBlur={HandleBlur}
               className={` text-xl flex-grow-1 p-2 ${inputVisibility} surface-ground`} />
         </section>

         <div>
            <Button className="align-self-end" icon="pi pi-trash" severity="danger" disabled={busy} outlined onClick={confirmAction} />
         </div>
      </header>
      <section className="flex w-full gap-1 pt-1 px-2">

         {ShowData ? <>

            <CurrencyDropDown className={`${inputVisibility}`}
               loading={context.data.FetchingCurrencies}
               options={context.data.ValidCurrencies}
               value={transactionData.ammountType}
               onChange={(e) => {
                  let newAmmount = transactionData.amount;
                  if (context.data.User.AutoExchange) {
                     if (context.data.Exchange) {
                        if (transactionData.ammountType.code != context.data.User.BaseCurrency.code) { // we fetch the original value from the exchange rates.
                           newAmmount /= context.data.Exchange.rates[transactionData.ammountType.code];
                        }
                        newAmmount *= context.data.Exchange.rates[e.value.code];
                     }
                  }
                  setTransactionData(prevData => ({
                     ...prevData,
                     ammountType: e.value,
                     amount: newAmmount,
                  }));
               }}
               onBlur={HandleBlur} />

            <NumberInput placeholder="Transaction Ammount"
               className={`flex-grow-1 hidden-input text-lg p-2 ${textColor} ${inputVisibility}`}
               value={transactionData.amount}
               onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setTransactionData(prevData => ({ ...prevData, amount: parseFloat(e.target.value) }));
               }}
               onBlur={HandleBlur}
            />
         </> : <div className="">
            <i className="pi pi-lock text-xl pl-2 pr-1" />
            <input className="flex-grow-1 p-2 text-lg hidden-input surface-ground"
               placeholder="************" readOnly
               value={"************"} />

         </div>}



      </section>
      <footer className="flex w-full justify-content-end">
         <Calendar touchUI={context.data.User.IsMobile}
            onChange={(e) => {
               setBusy(true);
               setTransactionData(prevData => ({ ...prevData, dateTime: (e.value as Date).getTime() }));
               setBusy(false);
            }}
            onBlur={HandleBlur}
            className="hidden-input mt-2" showTime
            value={transactionDataTime} />
      </footer>
   </article>)
};
export default TransactionCard
