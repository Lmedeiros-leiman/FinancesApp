import { useContext, useState } from "react";
import { Transaction } from "../../Data/Types/Transaction";
import { Button } from "primereact/button";

import { Calendar } from "primereact/calendar";
import CurrencyDropDown from "../form/CurrencyDropDown";
import NumberInput from "../form/NumberInput";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";
import { ExchangeContext, ExchangeContextType } from "../../Data/Contexts/ExchangeContext";
import { CurrencyContext, CurrencyContextType } from "../../Data/Contexts/CurrencyContext";



const TransactionCard: React.FC<{
   transaction: Transaction,

   HandleBlur?: (transaction: Transaction) => void,

   HandleDeletion?: () => void,

}> = (props): JSX.Element => {

   const userConfigs = useContext(Usercontext) as UserContextType
   const exchangeData = useContext(ExchangeContext) as ExchangeContextType
   const currencies = useContext(CurrencyContext) as CurrencyContextType

   const [busy, setBusy] = useState(false);
   const [transactionData, setTransactionData] = useState(props.transaction);


   const ShowData = userConfigs.data.Settings.ShowValues;
   //
   const backgroundColor = transactionData.amount < 0 ? "bg-red-300" : transactionData.amount > 0 ? "bg-green-300" : "bg-gray-300";
   const borderColor = transactionData.amount < 0 ? "border-red-700" : transactionData.amount > 0 ? "border-green-700" : "border-gray-300";
   const textColor = transactionData.amount < 0 ? "text-red-700" : transactionData.amount > 0 ? "text-green-700" : "";
   const icon = transactionData.amount < 0 ? "pi pi-send" : transactionData.amount > 0 ? "pi  pi-dollar" : "pi pi-arrow-down";

   const baseCurrencyEquivalent = () => {
      if (exchangeData.data) {
         if (transactionData.ammountType.code != userConfigs.data.BaseCurrency.code) {
            return (<span className=" surface-200 text-primary-400 border-round-3xl px-1 ">
               ({userConfigs.data.BaseCurrency.symbol} {(transactionData.amount / exchangeData.data.rates[transactionData.ammountType.code]).toFixed(userConfigs.data.BaseCurrency.decimal_digits)})
            </span>)
         }
         return (undefined)
      }
   }

   const inputVisibility = userConfigs.data.Settings.ShowForms ? "" : "hidden-input";

   const transactionDataTime = new Date(transactionData.dateTime)

   const HandleBlur = async () => {
      setBusy(true); //
      props.HandleBlur && props.HandleBlur(transactionData);
      setBusy(false);
   }

   const DeleteTransaction = async () => {
      setBusy(true)
      props.HandleDeletion && props.HandleDeletion()
      setBusy(false)
   }

   return (<>
      <article className={`surface-ground p-1 py-2  w-full max-w-25rem  border-1 ${borderColor} shadow-3 border-round relative`}>
         <aside className=" flex flex-grow-1 justify-content-between ">

            <aside>
               <div className="flex w-8rem align-items-start">
                  <i className={` ${icon} ${backgroundColor} border-round-3xl text-xl p-2 `} />
                  <input placeholder="Transaction Title" value={transactionData.title}
                     onChange={(e) => { setTransactionData(prevData => ({ ...prevData, title: e.target.value })) }}
                     onBlur={HandleBlur}
                     className={` w-6rem flex-grow-1 p-1 text-base  ${inputVisibility} surface-ground`} />
               </div>
               <div className="flex justify-content-start">
                  <Calendar touchUI={userConfigs.data.IsMobile}
                     onChange={(e) => {
                        setBusy(true);
                        setTransactionData(prevData => ({ ...prevData, dateTime: (e.value as Date).getTime() }));
                        setBusy(false);
                     }}
                     onBlur={HandleBlur}
                     className="hidden-input text-left " showTime
                     value={transactionDataTime} />
               </div>
            </aside>
            <section>
               <div>
                  {ShowData ? <span className="text-right">
                     <span className="flex align-items-center">
                        <NumberInput placeholder="Transaction Ammount"
                           className={`flex-grow-1 w-8rem hidden-input text-lg p-1 mr-1 text-right ${textColor} ${inputVisibility}`}
                           value={transactionData.amount}
                           onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              setTransactionData(prevData => ({ ...prevData, amount: parseFloat(e.target.value) }));
                           }}
                           onBlur={HandleBlur}
                        />
                        <CurrencyDropDown className={`${inputVisibility}`}
                           loading={exchangeData.busy}
                           options={currencies.data}
                           value={transactionData.ammountType}
                           onChange={(e) => {

                              setTransactionData(prevData => ({
                                 ...prevData,
                                 ammountType: e.value,
                              }));
                           }}
                           onBlur={HandleBlur} />
                     </span>
                     <div className="text-sm">
                        {baseCurrencyEquivalent()}
                     </div>
                  </span>
                     : <div className="">
                        <i className="pi pi-lock text-xl pl-2 pr-1" />
                        <input className="flex-grow-1 p-2 text-lg hidden-input surface-ground"
                           placeholder="************" readOnly
                           value={"************"} />
                     </div>
                  }
               </div>

            </section>

         </aside>

         <footer className="flex w-full gap-2 px-1 mb-1">
            <textarea className=" flex-grow-1 border-none p-1 border-round no-resize surface-100 " placeholder="Category"
               onChange={(e) => { setTransactionData(prevData => ({ ...prevData, category: e.target.value })) }}
               onBlur={HandleBlur}
               value={transactionData.category}>
            </textarea>
            <Button onClick={DeleteTransaction} className="flex-grow-0 " disabled={busy} outlined icon="pi pi-trash" severity="danger" />

         </footer>
      </article>
   </>);
};
export default TransactionCard
