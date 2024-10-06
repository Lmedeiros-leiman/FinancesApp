import InputTransaction from "../components/InputTransaction";
import TransactionHistory from "../components/TransactionHistory";

export default function Home() {
   return (<>
      <main>
         <h1>Home!</h1>
         <InputTransaction/>

         <TransactionHistory/>
      </main>
   </>)
}
