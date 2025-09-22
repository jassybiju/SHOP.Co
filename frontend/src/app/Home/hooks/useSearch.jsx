import { useQuery } from "@tanstack/react-query";
import { searchProductService } from "../services/search.service";

export const useSearchProduct = () => {
    return useQuery({
        queryFn: searchProductService,
    });
};
