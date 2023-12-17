import { useGetAllCategoryQuery } from "../redux/features/category/category-api-slice";

const useCategory = () => {

    const { isLoading, data } = useGetAllCategoryQuery();
    if (!isLoading) {
        return [isLoading, data]
    }
    else{
        return  [isLoading, data || []]
    }

}

export default useCategory;