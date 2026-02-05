import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import transactionService from '../services/transactionService';

export const useTransactions = () => {
    return useQuery({
        queryKey: ['transactions'],
        queryFn: () => transactionService.getAllTransactions(),
        staleTime: 2 * 60 * 1000, // 2 minutes
    });
};

export const useTransactionById = (id) => {
    return useQuery({
        queryKey: ['transactions', id],
        queryFn: () => transactionService.getTransactionById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useCreateTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (transactionData) => transactionService.createTransaction(transactionData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['assets'] });
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });
};

export const useDeleteTransaction = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => transactionService.deleteTransaction(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['transactions'] });
            queryClient.invalidateQueries({ queryKey: ['assets'] });
            queryClient.invalidateQueries({ queryKey: ['reports'] });
        },
    });
};
