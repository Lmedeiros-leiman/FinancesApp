using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FinancesApp.Models
{
    public enum TransactionCategories {

    }
    public class Transaction {
        public string Title {get; set;} = "";
        public int Ammount {get; set;}
        public string Category {get; set;} = "";

        public DateOnly Date {get; set;} = DateOnly.FromDateTime(DateTime.Now);
        public TimeOnly Time {get; set;} = TimeOnly.FromDateTime(DateTime.Now);
        
    }
}
