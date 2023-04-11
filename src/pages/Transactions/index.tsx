import { useEffect, useState } from "react";
import { Summary } from "../../Summary";
import { Header } from "../../components/Header";
import { SearchForm } from "./componentes/SearchForm";
import { PriceHighlight, TransaciotionsContainer, TransactionsTable } from "./styles";


interface Transaction {
  id: number;
  description: string;
  type:'income' | 'outcome';
  price: number;
  category: string;
  createdAt: number;
}
export function Transaciotion() {

  const [transactions, setTransactions] = useState<Transaction[]>([]);

  async function loadTransactions() {
    const response = await fetch('http://localhost:3000/transactions');
    const data = await response.json();
    setTransactions(data);
    
  }

useEffect(() => {
  loadTransactions();
  console.log(transactions);
},[]);

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
                        R$ {transaction.price}
                      </PriceHighlight>
                    </td>
                    <td>{transaction.category} </td>
                    <td>{transaction.createdAt }</td>
                  </tr>    
                )
              })}

          </tbody>
        </TransactionsTable>
      </TransaciotionsContainer>
    </div>
  )
}