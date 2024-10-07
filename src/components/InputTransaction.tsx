
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useContext, useState } from "react";
import { Transaction } from "../Data/Types/Transaction";
import { Calendar } from "primereact/calendar";
import { Database, DatabaseStores } from "../Data/Database";
import { InputText } from "primereact/inputtext";
import { FloatLabel } from "primereact/floatlabel";
import { InputNumber } from "primereact/inputnumber";
import { TreeNode } from "primereact/treenode";
import { Dropdown } from "primereact/dropdown";
import { IconList, TransactionType, TransactionTypes } from "../Data/Selections/TransactionTypes";
import { GlobalContext } from "../Data/GlobalContext";


export default function InputTransaction() {
   const context = useContext(GlobalContext)
   const [open, setOpen] = useState(false);
   const [newTransaction, setNewTransaction] = useState<Transaction>({
      title: "",
      amount: 0,
      ammountType: "USD",
      category: "",
      dateTime: new Date(/* current date */).getTime(),
      type: null,
      // these values get added once the transaction is saved.
      createdAt: new Date(/* current date */).getTime(),
      id: crypto.randomUUID(),
   });



   function HandleClose() {
      setNewTransaction({
         title: "",
         amount: 0,
         ammountType: "USD",
         category: "",
         dateTime: new Date(/* current date */).getTime(),
         type: null,
         // these values get added once the transaction is saved.
         createdAt: new Date(/* current date */).getTime(),
         id: crypto.randomUUID(),
      })
      setOpen(false);

   }
   async function HandleSave() {
      console.log("Adding new transaction to database...")
      const db = await Database.getDB();
      
      while (await db.getKey(DatabaseStores.Finances, newTransaction.id) == newTransaction.id ) {
         setNewTransaction({...newTransaction, id : crypto.randomUUID()})
      }
      setNewTransaction({ ...newTransaction, createdAt: new Date() })
      await db.add(DatabaseStores.Finances, newTransaction)
      
      context.UpdateData(prevData => ({
         ...prevData, 
         Finances: [
            ...prevData.Finances, 
            newTransaction
         ]
      }));
      
      console.log(newTransaction)
      console.log("New transaction added to database.")
      await db.close()
      HandleClose();
   }
   return (<>
      <Button onClick={() => setOpen(true)}><i className="pi pi-plus"></i></Button>
      
      <Dialog header="New Transaction" visible={open} draggable={false} onHide={HandleClose}>
         <form onSubmit={(e) => { e.preventDefault(); HandleSave() }}>
         <div className="flex flex-column gap-2 pt-4 " >
            <header className="mb-4 flex gap-3">
               <FloatLabel >
                  <InputText required id="Transactiontitle" value={newTransaction.title} onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })} ></InputText>
                  <label htmlFor="Transactiontitle">Title</label>
               </FloatLabel>
               <FloatLabel>
                  <Dropdown style={{ width: "180px" }}
                     value={newTransaction.type} editable clearIcon
                     options={TransactionTypes}
                     optionLabel="name"
                     optionValue="value"
                     valueTemplate={(option : TransactionType, props) => {
                        if (option) {
                           return (<div className="flex align-items-center">
                              <i className={`pi ${ IconList[option.name as keyof typeof IconList] } mr-2`}></i>
                              <span>{option.name}</span>
                           </div>)
                        }
                        return <span> </span>;
                     }}
                     itemTemplate={(option : TransactionType) => {
                        return (<div className="flex align-items-center"> 
                           <i className={`pi ${ IconList[option.name as keyof typeof IconList] } mr-2`}></i> 
                           <span>{option.name}</span>
                        </div>)
                     }}
                     onChange={(e) => { 
                        setNewTransaction({ 
                           ...newTransaction, 
                           type: e.value
                        })
                     }}

                     placeholder="Transaction Type"
                  />
                  <label>Transaction Type</label>
               </FloatLabel>
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
               <Calendar value={new Date(newTransaction.dateTime)} showTime hourFormat="12" required
                  onChange={(e) => {
                     if (e.value != null && e.value != undefined) {
                        setNewTransaction({ ...newTransaction, dateTime: e.value.getTime() })
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
