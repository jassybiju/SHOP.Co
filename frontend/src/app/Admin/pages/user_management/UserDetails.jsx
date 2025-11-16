import { useParams } from "react-router";
import IconCards from "../../components/IconCards";
import Header from "../../components/Header";
import { BadgeCent } from "lucide-react";
import { useGetUser } from "../../hooks/useUserManagement";
import Loader from "@/components/Loader";

const UserDetails = () => {
    const { id } = useParams();
    console.log(id)
    const {data, isLoading} = useGetUser(id)
    // console.log(user, isLoading)
    if(isLoading){
      return <Loader/>
    }
    return (
      <div>
        <Header heading="User Details" goback/>
        <div className="m-4 bg-white rounded-2xl shadow-sm p-6 flex gap-20  items-start w-full ">
            <div>
                <div className="bg-green-200 w-20 h-20 rounded-full flex justify-center items-center text-5xl font-extrabold" >J</div>
            </div>
            <div>
                <h1 className="text-3xl font-extrabold font-bakbak">{data.data.first_name} {data.data.last_name}</h1>
                <p>{data.data.email}</p>
                <div>{data.data.active ? "Active" : "Inactive"}</div>
            </div>
            <div>
              {/* <button className="bg-red-600 text-white">Block</button> */}
            </div>
        </div>
        <div className="w-full flex justify-start px-5">
        <IconCards icon={<BadgeCent/>} value={data.data.totalOrders} label={'Total Orders'}/>
        {/* <IconCards icon={<BadgeCent/>} value={'$450.00'} label={'Total Spent'}/>
        <IconCards icon={<BadgeCent/>} value={'$450.00'} label={'Total Spent'}/> */}

        </div>

            <div className="m-4 bg-white rounded-2xl shadow-sm p-6 flex flex-col  items-start w-full">
  {/* Tab Header */}
            <div className="border-b border-[#F8F8FA] px-6 py-4">
              <div className="relative">
                <span className="text-[14px] text-[#7848F4] font-medium font-poppins">
                  Overview
                </span>
                <div className="absolute bottom-[-16px] left-0 w-12 h-[1.25px] bg-[#7848F4]"></div>
              </div>
            </div>
            {/* Content Grid */}
            <div className="grid w-full grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x divide-[#F8F8FA]">
              {/* Personal Information */}
              <div className="p-6 space-y-6">
                <h3 className="text-[18px] font-semibold text-[#131315] leading-[27px] font-poppins">
                  Personal Information
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      Full Name
                    </span>
                    <span className="text-[14px] text-[#131315] font-medium font-poppins">
                     {data.data.first_name} {data.data.last_name}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      Email Address
                    </span>
                    <span className="text-[14px] text-[#131315] font-medium font-poppins">
                      {data.data.email}
                    </span>
                  </div>

                  {/* <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      Phone Number
                    </span>
                    <span className="text-[14px] text-[#131315] font-medium font-poppins">
                      {data.data.email}
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Account Details */}
              <div className="p-6 space-y-6">
                <h3 className="text-[18px] font-semibold text-[#131315] leading-[27px] font-poppins">
                  Account Details
                </h3>

                <div className="space-y-6">
                  <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      User ID
                    </span>
                    <span className="text-[14px] text-[#131315] font-medium font-poppins">
                      #USR-001234
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      Account Type
                    </span>
                    <span className="text-[14px] text-[#131315] font-medium font-poppins">
                      User
                    </span>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-[#F8F8FA]">
                    <span className="text-[14px] text-[#7E7E7E] font-medium font-poppins">
                      Verification Status
                    </span>
                    <span className={`text-[14px] text-[#22C55E] font-medium font-poppins ${data.data.is_verified ? "text-[#22C55E]" : 'text-red-500'}`}>
                                            {data.data.is_verified ? "Verified" : "Not Verified"}

                    </span>
                  </div>
                </div>
              </div>
            </div>
            </div>
        </div>
    );
};

export default UserDetails;
