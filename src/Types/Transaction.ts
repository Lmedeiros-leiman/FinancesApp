export class Transaction  {
   id: number = 0;
   title: string;
   amount: number;
   type: string;
   category: string;
   date: string;
   time: string;
   createdAt: string;

   constructor(title: string, amount: number, type: string, category: string, date: string, time: string, createdAt: string) {
      this.title = title;
      this.amount = amount;
      this.type = type;
      this.category = category;
      this.date = date;
      this.time = time;
      this.createdAt = createdAt;
   }
}