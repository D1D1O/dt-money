import { createContext, useEffect, useState } from "react";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: number;
}

interface TransactionContextType {
    transactions: Transaction[];
}
export const TransactionsContext = createContext({} as TransactionContextType);


interface TransactionProviderProps {
    children: React.ReactNode;
}
export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function loadTransactions() {
        const response = await fetch('http://localhost:3000/transactions');
        const data = await response.json();
        setTransactions(data);
    
    }
    
    useEffect(() => {
         loadTransactions();
        console.log(transactions);
    }, []);

    return (
        <TransactionsContext.Provider value={{ transactions }}>
            {children}
        </TransactionsContext.Provider>
    )
}