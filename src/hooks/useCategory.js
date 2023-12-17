import { useGetAllCategoryQuery } from "../redux/features/category/category-api-slice";

const useCategory = () => {

    const { isLoading, data } = useGetAllCategoryQuery();

    return [isLoading, data]

}

export default useCategory;