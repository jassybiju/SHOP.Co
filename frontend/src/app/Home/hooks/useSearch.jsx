import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { searchProductService } from "../services/search.service";

export const useSearchProduct = (params) => {
    return useQuery({
        queryFn: searchProductService,
        queryKey : ['search', {...params}],
        placeholderData : keepPreviousData
    });
};
