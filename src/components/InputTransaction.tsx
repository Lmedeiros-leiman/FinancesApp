
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { Transaction } from "../Types/Transaction";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";


export default function InputTransaction() {
   const [open, setOpen] = useState(false);
   const [newTransaction, setNewTransaction] = useState<Transaction>({
      title: "",
      amount: 0,
      date: "",
      category: "",
      createdAt: "",
      time: "",
      type: "",
      id: 0,
   });
   function HandleClose() {
      setOpen(false);

   }
   function HandleSave() {
      
   }
   


   return (<>
      <Button onClick={() => setOpen(true)}>Yo</Button>

      <Dialog header="New Transaction" visible={open} onHide={HandleClose}>
         <div>
            <input value={newTransaction.title} onChange={(e) => setNewTransaction({ ...newTransaction, title: e.target.value })} />
            <input type="number" value={newTransaction.amount} onChange={(e) => setNewTransaction({ ...newTransaction, amount: Number(e.target.value) })} />
            <input type="text" value={newTransaction.category} onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })} />
         </div>
         <footer>
            <Button label="Cancel" icon="pi pi-times" onClick={HandleClose} />
            <Button label="Save" icon="pi pi-check" onClick={HandleSave} />
         </footer>
      </Dialog>
   </>)

}


