import api from './api';

const assetService = {
    getAllAssets: async () => {
        const response = await api.get('/assets');
        return response.data;
    },

    getAssetById: async (id) => {
        const response = await api.get(`/assets/${id}`);
        return response.data;
    },

    createAsset: async (assetData) => {
        const response = await api.post('/assets', assetData);
        return response.data;
    },

    updateAsset: async (id, assetData) => {
        const response = await api.put(`/assets/${id}`, assetData);
        return response.data;
    },

    deleteAsset: async (id) => {
        const response = await api.delete(`/assets/${id}`);
        return response.data;
    },
};

export default assetService;
