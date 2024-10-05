
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Transaction } from "../Types/Transaction";
import { Calendar } from "primereact/calendar";
import { Database, DatabaseTables } from "../Data/Database";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { TreeSelect } from "primereact/treeselect";
import { TreeNode } from "primereact/treenode";
import { PrimeIcons } from "primereact/api";


export default function InputTransaction() {

   const [open, setOpen] = useState(false);
   const [newTransaction, setNewTransaction] = useState<Transaction>({
      title: "",
      amount: 0,
      ammountType: "USD",
      category: "",
      dateTime: new Date(/* current date */),
      type: null,
      // these values get added once the transaction is saved.
      createdAt: 0,
      id: ""
   });


   const Availabletypes: TreeNode[] = [
      {
         key: "0",
         icon: 'pi pi-folder',
         label: 'None',
         data: null,

      },
      {
         key: "Expense",
         icon: 'pi pi-folder',
         label: 'Expense',
      },
      {
         key: "Income",
         icon: 'pi pi-folder',
         label: 'Income',
      }
   ]

   const AvailableCurrencies : TreeNode[] = [
      {} // to be implemented.
   ]

   const formater = new Intl.NumberFormat(navigator.language, { style: "currency", currency: "USD" })


   function HandleClose() {
      setNewTransaction({
         title: "",
         amount: 0,
         ammountType: "USD",
         category: "",
         dateTime: new Date(/* current date */),
         type: null,
         // these values get added once the transaction is saved.
         createdAt: 0,
         id: ""
      })
      setOpen(false);

   }
   function HandleSave() {
      setNewTransaction({ ...newTransaction, createdAt: Date.now(), })
      Database.AddEntry(newTransaction, DatabaseTables.UserTransactions)



      
   }

   return (<>
      <Button onClick={() => setOpen(true)}>Yo</Button>
      <pre>
         {JSON.stringify(newTransaction)}
      </pre>

      <Dialog header="New Transaction" visible={open} draggable={false} onHide={HandleClose}>
         <form onSubmit={(e) => { e.preventDefault(); HandleSave() }}>
         <div className="flex flex-column gap-2 pt-4 " >
            <header className="mb-4 flex gap-3">
               <FloatLabel >
                  <InputText required id="Transactiontitle" value={newTransaction.title} onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })} ></InputText>
                  <label htmlFor="Transactiontitle">Title</label>
               </FloatLabel>
               <div >
                  <TreeSelect required options={Availabletypes}
                     placeholder="Select a type"
                     selectionMode="single"
                     display="chip"
                     value={newTransaction.type}
                     onChange={(e) => {
                        if (e.value != undefined) {
                           if (e.value == "0") {
                              setNewTransaction({ ...newTransaction, type: null })
                           } else {
                              setNewTransaction({ ...newTransaction, type: e.value.toString() })
                           }  
                        }
                     }}
                  />
               </div>
            </header>
            <FloatLabel className="mb-4">
               <InputNumber required mode="currency" currency="USD" locale={navigator.language} id="Transactionamount" value={newTransaction.amount}
                  onValueChange={(e) => {
                     if (e.value != null && e.value != undefined) {
                        setNewTransaction({ ...newTransaction, amount: e.value })
                     }
                  }} />
               <label>Transaction Amount</label>
            </FloatLabel>
            <FloatLabel className="mb-4">
               <Calendar value={newTransaction.dateTime} showTime hourFormat="12" required
                  onChange={(e) => {
                     if (e.value != null && e.value != undefined) {
                        setNewTransaction({ ...newTransaction, dateTime: new Date(e.value.getTime()) })
                     }
                  }}
               />
               <label>Transaction date</label>
            </FloatLabel>
            <FloatLabel>
               <InputText required id="Transactioncategory" value={newTransaction.category} onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })} ></InputText>
               <label htmlFor="Transactioncategory">Categories</label>
            </FloatLabel>

         </div>
         <footer className="mt-4 flex justify-content-end gap-2">
            <Button outlined severity="danger" label="Cancel" icon="pi pi-times" type="reset"  onClick={HandleClose} />
            <Button label="Save" severity="success" icon="pi pi-check" type="submit" />
         </footer>
         </form>
      </Dialog>
   </>)

}
