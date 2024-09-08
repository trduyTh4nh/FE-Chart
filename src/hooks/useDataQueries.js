import apiService from '@/service/api.service';
import APIService from '@/service/api.service';
import { useQuery } from '@tanstack/react-query';


export const useDataCategory = () => {
    return useQuery({
        queryKey: ['dataCategory'],
        queryFn: APIService.fetchDataCategory,
        staleTime: 1000 * 60 * 5, // này stale time là thời gian cũ, cái này sẽ giữ dữ liệu trong 5 phút trước khi refetch
    })
}

export const useDataMain = () => {
    return useQuery({
        queryKey: ['dataSample'],
        queryFn: apiService.fetchDataSampleCategory,
        staleTime: 1000 * 60 * 5
    })
}


export const useDataForPage = (page, itemsPerpage) => {
    return useQuery({
        queryKey: ['dataSample', page, itemsPerpage],
        queryFn: () => apiService.fetchDataSampleCategoryWithPage(page, itemsPerpage),
        keepPreviousData: true,  // cái này đẻ giữ data trong 
                                // khi mình đang fetching page tiếp theo 
    })
}