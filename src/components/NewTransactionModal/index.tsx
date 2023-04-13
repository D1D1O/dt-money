import * as Dialog from '@radix-ui/react-dialog';
import { Overlay, Content, CloseButton, TransactionType, TransactionTypeButton } from './styles';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { Controller } from 'react-hook-form';
import { api } from '../../lib/axios';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { useContextSelector } from 'use-context-selector';


const newTrasactionFormSchema = z.object({
    description: z.string(),
    price: z.number(),
    category: z.string(),
    type: z.enum(['income', 'outcome']),
});
type newTransactionInput = z.infer<typeof newTrasactionFormSchema>;

export function NewTransactionModal() {

    const createTransaction = useContextSelector(TransactionsContext,
        (context) => context.createTransaction
    );

    const {
        control,
        register,
        handleSubmit,
        formState: { isSubmitting },
        reset,
    } = useForm<newTransactionInput>({
        resolver: zodResolver(newTrasactionFormSchema),
    })

    async function handleCreateNewTransaction(data: newTransactionInput) {
        const { category, description, price, type } = data;

        await createTransaction({
            description,
            price,
            category,
            type,

        })
        reset();

    }
    return (
        <Dialog.Portal>
            <Overlay />
            <Content>
                <Dialog.Title >Nova transação</Dialog.Title>

                <CloseButton>
                    <X size={24} />
                </CloseButton>
                <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
                    <input
                        type="text"
                        placeholder='Desrição' required
                        {...register('description')}
                    />

                    <input
                        type="number"
                        placeholder='Preço' required
                        {...register('price', { valueAsNumber: true })}
                    />
                    <input
                        type="text"
                        placeholder='Categoria' required
                        {...register('category')}
                    />

                    <Controller
                        control={control}
                        name="type"
                        render={({ field }) => {
                            return (
                                <TransactionType onValueChange={field.onChange} value={field.value}>
                                    <TransactionTypeButton variant='income' value='income'>
                                        <ArrowCircleUp size={24} />
                                        Entrada
                                    </TransactionTypeButton>

                                    <TransactionTypeButton variant='outcome' value='outcome'>
                                        <ArrowCircleDown size={24} />
                                        Saída
                                    </TransactionTypeButton>
                                </TransactionType>
                            )
                        }}

                    />
                    <button type='submit' disabled={isSubmitting}>
                        Cadastrar
                    </button>
                </form>
            </Content>
        </Dialog.Portal>
    )
}