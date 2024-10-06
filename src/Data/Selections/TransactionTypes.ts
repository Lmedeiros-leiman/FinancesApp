
export interface TransactionType {
   name: string;
   value: string | null;
   icon: string | null;
}

export const TransactionTypes : TransactionType[] = [
   {
      name: "None", 
      value: null,
      icon: "pi pi-delete-left"
   },
   {
      name: "Income", 
      value: "Income",
      icon: "pi pi-dollar"
   },
   {
      name: "Expense", 
      value: "Expense",
      icon: "pi pi-send"
   },
]