import { Tree } from "primereact/tree";
import { useContext } from "react";
import { GlobalDataContext, GlobalDataContextType } from "../../Data/Contexts/GlobalDataContext";
import { MoneyConversionApiResponse } from "../../Data/Apis/CurrencyRatesApi";



const TreeDataDumper: React.FC = () => {

  return (<pre>
    {JSON.stringify(useContext(GlobalDataContext) as GlobalDataContextType, null, 2)}
  </pre>)
  const context = useContext(GlobalDataContext) as GlobalDataContextType;
  const data: any = [
    {
      "key": "UserData",
      "label": "User",
      icon: "pi pi-user",
      children: [
        {
          key: "UserData.Settings",
          label: "Settings",
          icon: "pi pi-cog",
          children:
            [...Object.entries(context.data.User.Settings).map(([key, value]) => {
              return {
                "key": key,
                "label": (<>
                  <span className="pr-3 ">
                    <i className={"border-round-2xl p-1 text-base font-bold " + (value ? " pi pi-check bg-green-200 " : " pi pi-times bg-red-400 ")} />
                  </span>
                  <span>{key}</span>
                </>),
              }

            })]
        },
        {
          key: "UserData.BaseCurrency",
          label: "Base Currency",
          icon: "pi pi-dollar",
          children: [
            {
              key: "BaseCurrency.Code",
              label: ` ${context.data.User.BaseCurrency.code} | ${context.data.User.BaseCurrency.name}`

            },
          ]
        },
        {
          key: "UserData.IsMobile",
          label: (<>
            <span className="pr-3 ">
              <i className={"border-round-2xl p-1 text-base font-bold " + (context.data.User.IsMobile ? " pi pi-check bg-green-200 " : " pi pi-times bg-red-400 ")} />
            </span>
            <span>Using Mobile</span>
          </>)
        }
      ]
    },
    {
      "key": "FinanceData",
      "label": "Finances",
      icon: "pi pi-dollar",
      children:
        [...Object.entries(context.data.Finances).map(([_, transaction]) => {
          return {
            "key": _,
            "label": (<>
              <span className="pr-3 ">
                <i className={"border-round-2xl p-1 text-base font-bold " +
                  (transaction.amount > 0 ? " pi pi-check bg-green-200 " : 
                    transaction.amount < 0 ? " pi pi-times bg-red-400 " : 
                    "pi pi-arrow-down bg-gray-400 "
                    )} />
              </span>
              <span>
                <span>{transaction.title}</span>
              </span>
            </>),
          }

        })
      ]
    },
    {
      "key": "Exchanges",
      "label": "Exchanges",
      icon: "pi pi-exchange",
      children: [ context.data.Exchange == undefined ? [ ] : [
        ...Object
        .entries((context.data.Exchange as MoneyConversionApiResponse ).rates)
        .map(([currency, rate]) => {
          return({
            "key": currency + rate,
            "label": `${currency} : ${rate}`
          })
        })
      ]
      ]
      
    },
    {
      key: "Currencies",
      label: "Currencies",
    }
  ];

  return (
    <>
      <Tree value={data} />
    </>);
};
export default TreeDataDumper;
