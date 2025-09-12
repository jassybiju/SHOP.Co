import { MoveLeft, MoveRight } from "lucide-react";

const TableComponent = ({ data = [], column = [], page, pages, onPageChange }) => {
    console.log(pages)
    return (
        <div className="bg-white shadow rounded-2xl p-4 m-4 w-max-xl overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-100">
                <thead>
                    <tr className="border-b">
                        {column.map((x) => (
                            <th className="px-6 py-3 text-xs font-semibold text-gray-500 text-left">
                                {x.label}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                    {data.map((user, idx) => (
                        <tr key={idx}>
                            {column.map((x) => (
                                <th className="px-6 py-3 text-xs font-semibold text-gray-500 text-left">
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
            <div className="flex items-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
                <div className="flex flex-1 justify-between sm:hidden">
                    <a
                        href="#"
                        className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
                    >
                        Previous
                    </a>
                    <a
                        href="#"
                        className="relative  ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2  font-medium text-gray-200 hover:bg-white/10"
                    >
                        Next
                    </a>
                </div>
                <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                    <div>
                        {/* <p className="text-sm text-gray-700">
                            Showing <span className="font-medium">{}</span> to{" "}
                            <span className="font-medium">10</span> of{" "}
                            <span className="font-medium">{pages*}</span> results
                        </p> */}
                    </div>
                    <div>
                        <nav
                            aria-label="Pagination"
                            className="isolate inline-flex -space-x-px rounded-md"
                        >
                            <button
                                disabled={page === 1}                                
                                onClick={()=>onPageChange(page-1)}
                                href="#"
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2  inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${page ===1 ? "text-gray-400" : 'text-black'}`}
                            >
                                <span className="sr-only">Previous</span>
                                <MoveLeft
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                            {[...Array(pages)].map((_, x) => (
                                <button
                                disabled={page === x+1}                                
                                 onClick={()=>onPageChange(x+1)}
                                    href="#"
                                    aria-current="page"
                                    className={`relative z-10 inline-flex items-center   px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 inset-ring focus-visible:outline-indigo-500 ${(page-1) === x ? "bg-indigo-500 hover:bg-indigo-500" : 'hover:bg-white/5'}`}
                                >
                                    {x+1}
                                </button>
                            ))}

                          
                            <button
                            disabled={page===pages}
        
                             onClick={()=>onPageChange(page+1)}
                                href="#"
                                
                                className={`relative inline-flex items-center rounded-l-md px-2 py-2  inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${page ===pages ? "text-gray-400" : 'text-black'}`}
                            >
                                <span className="sr-only">Next</span>
                                <MoveRight
                                    aria-hidden="true"
                                    className="size-5"
                                />
                            </button>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default TableComponent;
