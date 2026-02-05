import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import assetService from '../services/assetService';

export const useAssets = () => {
    return useQuery({
        queryKey: ['assets'],
        queryFn: () => assetService.getAllAssets(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    });
};

export const useAssetById = (id) => {
    return useQuery({
        queryKey: ['assets', id],
        queryFn: () => assetService.getAssetById(id),
        staleTime: 5 * 60 * 1000,
        enabled: !!id,
    });
};

export const useCreateAsset = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (assetData) => assetService.createAsset(assetData),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] });
        },
    });
};

export const useUpdateAsset = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }) => assetService.updateAsset(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] });
        },
    });
};

export const useDeleteAsset = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id) => assetService.deleteAsset(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['assets'] });
        },
    });
};
