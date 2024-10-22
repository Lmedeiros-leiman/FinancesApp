import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext, useState } from "react";
import { Transaction } from "../Data/Types/Transaction";
import { Calendar } from "primereact/calendar";
import { Database, DatabaseStores } from "../Data/Database";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import {  GlobalDataContext, GlobalDataContextType } from "../Data/Contexts/GlobalDataContext";
import "../styles/InputTransaction.css";
import CurrencyDropDown from "./form/CurrencyDropDown";

export default function InputTransaction() {
   const context = useContext(GlobalDataContext) as GlobalDataContextType
   const defaultTransaction = {
      title: "",
      amount: 0,
      // user base currency or default USD.
      ammountType: context.data.User.BaseCurrency || {
         "code": "USD",
         "name": "US Dollar",
         "decimal_digits": 2,
         "name_plural": "US dollars",
         "rounding": 0,
         "symbol": "$",
         "symbol_native": "$"
      },
      category: "",
      dateTime: new Date().getTime(),
      type: null,
      // these values get added once the transaction is saved.
      createdAt: new Date().getTime(),
      id: crypto.randomUUID()
   };

   const [open, setOpen] = useState(false);
   const [newTransaction, setNewTransaction] = useState<Transaction>(defaultTransaction);

   const HandleClose = () => {
      setNewTransaction(defaultTransaction)
      setOpen(false);

   }
   const HandleSave = async (e : React.SyntheticEvent) => {
      e.preventDefault()
      console.log("Adding new transaction to database...")

      //
      // do some data handling before inserting into the database.
      setNewTransaction({
         ...newTransaction, 
         type: newTransaction.amount > 0 ? "Expense" : "Income",
         createdAt: new Date().getTime(),
         id: crypto.randomUUID(),
      });
      
      //
      // now we can insert it.
      const db = await Database.getDB();
      while (await db.getKey(DatabaseStores.Finances, newTransaction.id) == newTransaction.id) {
         // making sure its ID is unique.
         setNewTransaction({ ...newTransaction, id: crypto.randomUUID() })
      }
      await db.add(DatabaseStores.Finances, newTransaction)
      context.UpdateData(prevData => ({
         ...prevData,
         Finances: [
            ...prevData.Finances,
            newTransaction
         ]
      }));

      console.log("New transaction added to database.")
      db.close()
      HandleClose();
   }

   return (<span>
      <Button className="gap-1 InputTransaction"
         onClick={() => setOpen(true)}>
            <i className="pi pi-plus"></i>
         <span>Add Transaction</span>
      </Button>

      <Dialog header="Adding new transaction" visible={open} draggable={false}
         onHide={HandleClose}>
         <form onSubmit={HandleSave}
            className="mt-4 flex flex-column gap-4">
            <div>
               <FloatLabel>
                  <InputText required id="title"
                     value={newTransaction.title}
                     onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })}
                  />
                  <label>Title</label>
               </FloatLabel>
            </div>
            <div className="flex gap-1">
                  <CurrencyDropDown loading={context.data.FetchingCurrencies}
                     options={context.data.ValidCurrencies}
                     onChange={(e) => setNewTransaction({ ...newTransaction, ammountType: e.value })}
                     value={newTransaction.ammountType} />
               
               <FloatLabel>
                  <InputNumber required id="amount" maxFractionDigits={6}
                     value={newTransaction.amount}
                     onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.value ? e.value : 0 })}
                  />
                  <label>Transaction Ammount</label>
               </FloatLabel>
            </div>
            <div>
               <Calendar id="TransactionDateTime" 
                  touchUI={context.data.User.IsMobile} showIcon showButtonBar
                  value={ new Date(newTransaction.dateTime)} showTime hourFormat="12"
                  onChange={(e) => setNewTransaction({ ...newTransaction, dateTime: e.value?.getTime() || 0 })}
               />
            </div>
            <div>
               <FloatLabel>
                  <InputText required id="category"
                     value={newTransaction.category}
                     onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
                     />
                     <label>Category</label>
               </FloatLabel>
            </div>
            <footer className="flex justify-content-end gap-2">
               <Button outlined severity="danger" type="button" label="Cancel" onClick={HandleClose} />
               <Button severity="info" type="submit" label="Save" />
            </footer>
         </form>
      </Dialog>
   </span>);
}
