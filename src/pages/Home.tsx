import TransactionHistory from "../components/TransactionRelated/TransactionHistory";
import DataRangeResume from "../components/DataRangeResume/DataRangeResume";


export default function Home() {

   return (<main className="relative w-full">
      <article className="flex flex-wrap justify-content-center px-1 mt-1">

         <section className=" flex flex-wrap gap-1 flex-grow-1 p-1 w-full surface-ground border-1 border-gray-400 p-1 border-round">
            <DataRangeResume />
         </section>

         <footer className="text-center flex mb-4 mt-5 flex-column w-full flex-grow-1">
            <TransactionHistory />
         </footer>
      </article>

   </main>)
}
