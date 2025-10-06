import { Package2, User } from "lucide-react";
import Header from "../../components/Header";
import IconCards from "../../components/IconCards";
import { useGetAllProducts } from "../../hooks/useProductManagement";
import { useGetAllBrands } from "../../hooks/useBrandManagement";
import { useGetAllUsers } from "../../hooks/useUserManagement";
import Loader from "../../../../components/Loader";
const Dashboard = () => {
    const {data : products , isLoading : productLoading} = useGetAllProducts()
    const {data : users , isLoading : userLoading} = useGetAllUsers()

    
    if(productLoading && userLoading){
        return <Loader/>
    }
    return (
        <div>
            {" "}
            <Header heading="Dashboard" />
            <div className="flex gap-10 m-10">
            <IconCards
                icon={<User size={35} />}
                value={users?.total_users}
                label={"total users"}
            /> <IconCards
                    icon={<Package2 size={35} />}
                    value={products?.total_products}
                    label={"total products"}
                />
            </div>
        </div>
    );
};
export default Dashboard;
