import { Accordion, AccordionTab } from "primereact/accordion";
import { useContext } from "react";
import { Usercontext, UserContextType } from "../../Data/Contexts/UserContext";
import { CurrencyContext, CurrencyContextType } from "../../Data/Contexts/CurrencyContext";
import { ExchangeContext, ExchangeContextType } from "../../Data/Contexts/ExchangeContext";
import { FinancesContext, FinancesContextType } from "../../Data/Contexts/FinancesContext";


const TreeDataDumper: React.FC = () => {
  const userData = useContext(Usercontext) as UserContextType
  const finances = useContext(FinancesContext) as FinancesContextType
  const exchange = useContext(ExchangeContext) as ExchangeContextType
  const currency = useContext(CurrencyContext) as CurrencyContextType

  return (<>
    <Accordion>
      <AccordionTab header="User Configurations">
        <pre>
          {JSON.stringify(userData, null, 2)}
        </pre>
      </AccordionTab>
      <AccordionTab header="Loaded Finances">
        <pre>
        {JSON.stringify(finances, null, 2)}
        </pre>
      </AccordionTab>
      <AccordionTab header="Loaded Currencies">
        <pre>
        {JSON.stringify(currency, null, 2)}
        </pre>
      </AccordionTab>
      <AccordionTab header="Loaded Exchange Rates">
        <pre>
          {JSON.stringify(exchange, null, 2)}
        </pre>
      </AccordionTab>
    </Accordion>
  </>)
};
export default TreeDataDumper;
