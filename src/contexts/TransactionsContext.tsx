import { useEffect, useState } from "react";
import { api } from "../lib/axios";
import { createContext } from "use-context-selector";

interface Transaction {
    id: number;
    description: string;
    type: 'income' | 'outcome';
    price: number;
    category: string;
    createdAt: number;
}
interface CreateTransactionInput{
    category: string;
    description: string;
    price: number;
    type: 'income' | 'outcome';
}

interface TransactionContextType {
    transactions: Transaction[];
    fetchTransactions: (query?: string) => Promise<void>;
    createTransaction: (data: CreateTransactionInput) => Promise<void>;
}
export const TransactionsContext = createContext({} as TransactionContextType);


interface TransactionProviderProps {
    children: React.ReactNode;
}


export function TransactionsProvider({ children }: TransactionProviderProps) {
    const [transactions, setTransactions] = useState<Transaction[]>([]);

    async function fetchTransactions(query?: string) {
        
        const response = await api.get('/transactions',{
            params:{
                _sort: 'createdAt',
                _order: 'desc',
                q: query,
            }
        } )

        setTransactions(response.data);
    
    }
    
    async function createTransaction(data : CreateTransactionInput){
        const {category,description,price,type}  = data;
        const response = await api.post('/transactions', {
            category,
            description,
            price,
            type,
            createdAt: new Date(),
        });

        setTransactions(state => [response.data, ...state]);

    }
    useEffect(() => {
         fetchTransactions();
        console.log(transactions);
    }, []);

    return (
        <TransactionsContext.Provider value={{ 
            transactions,
            fetchTransactions,
            createTransaction }}>
            {children}
        </TransactionsContext.Provider>
    )
}