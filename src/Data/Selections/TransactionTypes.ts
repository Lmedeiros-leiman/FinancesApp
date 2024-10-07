
export interface TransactionType {
   name: string;
   value: string | null;
}

export enum IconList {
   undefined = " ",
   null = " ",
   "None" = "pi-delete-left",
   "Income" = "pi pi-dollar",
   "Expense" = "pi pi-send",
}

export const TransactionTypes : TransactionType[] = [
   {
      name: "None", 
      value: null,
   },
   {
      name: "Income", 
      value: "Income",
   },
   {
      name: "Expense", 
      value: "Expense",
   },
]