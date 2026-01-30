import api from './api';

const transactionService = {
    getAllTransactions: async () => {
        const response = await api.get('/transactions');
        return response.data;
    },

    getTransactionById: async (id) => {
        const response = await api.get(`/transactions/${id}`);
        return response.data;
    },

    createTransaction: async (transactionData) => {
        const response = await api.post('/transactions', transactionData);
        return response.data;
    },

    deleteTransaction: async (id) => {
        const response = await api.delete(`/transactions/${id}`);
        return response.data;
    },
};

export default transactionService;
