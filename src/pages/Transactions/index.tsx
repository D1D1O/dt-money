import { Summary } from "../../components/Summary";
import { Header } from "../../components/Header";
import { SearchForm } from "./componentes/SearchForm";
import { PriceHighlight, TransaciotionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormater, priceFormater } from "../../utils/formatter";
import { useContextSelector } from "use-context-selector";


export function Transaciotion() {

const transactions =  useContextSelector(TransactionsContext,
    (context) => context.transactions
  );


  return (
    <div>
      <Header />
      <Summary />

      <TransaciotionsContainer>

        <SearchForm/>
        <TransactionsTable>
          <tbody>

            {
              transactions.map(transaction => {
                return (
                  <tr key={transaction.id}>
                    <td width="50%"> {transaction.description} </td>
                    <td>
                      <PriceHighlight variant={transaction.type}>
                        {transaction.type === 'outcome' && '-'}
                        {priceFormater.format(transaction.price)}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category} </td>
                    <td>{dateFormater.format(new Date(transaction.createdAt)) }</td>
                  </tr>    
                )
              })}

          </tbody>
        </TransactionsTable>
      </TransaciotionsContainer>
    </div>
  )
}