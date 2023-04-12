import { useContext, useEffect, useState } from "react";
import { Summary } from "../../Summary";
import { Header } from "../../components/Header";
import { SearchForm } from "./componentes/SearchForm";
import { PriceHighlight, TransaciotionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";


export function Transaciotion() {

const {transactions} =  useContext(TransactionsContext);


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