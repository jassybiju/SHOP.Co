import { MoveLeft, MoveRight } from "lucide-react";
import AdminPagination from "./AdminPagination";
import Pagination from "../../Home/pages/search/components/Pagination";

const TableComponent = ({ data = [], column = [], page, pages, onPageChange }) => {
    console.log(pages)
    return (
        <div className="bg-white shadow rounded-2xl p-4 m-4 w-max-xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="border-b">
                        {column.map((x) => (
                            <th className="px-6 py-3 text-xs text-center font-semibold text-gray-500 ">
                                {x.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {data.map((user, idx) => (
                        <tr key={idx}>
                            {column.map((x) => (
                                <th className="px-6 py-3 text-xs font-semibold text-black text-center">
                                    {x.render
                                        ? x.render(user[x.key], user, data)
                                        : user[x.key]}
                                </th>
                                // <td className="px-6 py-4 flex items-center gap-3">
                                //     {x.label}
                                // </td>;
                            ))}
                        </tr>

                        //     <td className="px-6 py-4 flex items-center gap-3">
                        //         {/* Avatar placeholder */}
                        //         <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center text-xs text-gray-400">
                        //             40 × 40
                        //         </div>
                        //         <span className="font-medium text-gray-900">
                        //             {user.name}
                        //         </span>
                        //     </td>
                        //     <td className="px-6 py-4 text-gray-800 text-base">
                        //         {user.email}
                        //     </td>
                        //     <td className="px-6 py-4 text-gray-800 text-base">
                        //         {user.id}
                        //     </td>
                        //     <td className="px-6 py-4 text-gray-800 text-base">
                        //         {user.status}
                        //     </td>
                        //     <td className="px-6 py-4 flex gap-2">
                        //         <button className="bg-violet-600 hover:bg-violet-700 text-white py-1 px-4 rounded font-semibold text-xs">
                        //             VIEW
                        //         </button>
                        //         <button className="bg-red-500 hover:bg-red-600 text-white py-1 px-4 rounded font-semibold text-xs">
                        //             BLOCK
                        //         </button>
                        //     </td>
                        // </tr>
                    ))}
                </tbody>
            </table>
                    <div className="w-full flex justify-center">

                    <Pagination page={page} pages={pages} onPageChange={onPageChange}/>
                </div>
            
        </div>
    );
};
export default TableComponent;
