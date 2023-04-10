import { Summary } from "../../Summary";
import { Header } from "../../components/Header";
import { SearchForm } from "./componentes/SearchForm";
import { PriceHighlight, TransaciotionsContainer, TransactionsTable } from "./styles";

export function Transaciotion() {
  return (
    <div>
      <Header />
      <Summary />

      <TransaciotionsContainer>

        <SearchForm/>
        <TransactionsTable>
          <tbody>
            <tr>
              <td width="50%"> Desenvolvimento Site</td>
              <td>
                <PriceHighlight variant="income">
                  R$ 12.000,00
                </PriceHighlight>
              </td>
              <td>Venda</td>
              <td>13/04/2023</td>
            </tr>
            <tr>
              <td width="50%">Hamburger</td>
              <td>
                <PriceHighlight variant="outcome">
                  -R$ 59,00
                </PriceHighlight>
              </td>
              <td>Alimentação</td>
              <td>13/04/2023</td>
            </tr>
          </tbody>
        </TransactionsTable>
      </TransaciotionsContainer>
    </div>
  )
}