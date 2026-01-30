import { useQuery } from '@tanstack/react-query';
import reportService from '../services/reportService';

export const useReportSummary = () => {
    return useQuery({
        queryKey: ['reports', 'summary'],
        queryFn: () => reportService.getSummary(),
        staleTime: 10 * 60 * 1000, // 10 minutes
    });
};
