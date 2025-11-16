import { MoveLeft, MoveRight } from "lucide-react";

const AdminPagination = ({ pages, page, onPageChange }) => {
    return (
        <div className="flex items-center text-center justify-between border-t border-white/10 px-4 py-3 sm:px-6">
            {pages === 0 ? (
              <p className="text-center mx-auto">  No Entries</p>
            ) : (
                <>
                    {" "}
                    <div className="flex flex-1 justify-between sm:hidden">
                        <button
                            href="/"
                            className="relative inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-gray-200 hover:bg-white/10"
                        >
                            Previous
                        </button>
                        <button
                            href="/"
                            className="relative  ml-3 inline-flex items-center rounded-md border border-white/10 bg-white/5 px-4 py-2  font-medium text-gray-200 hover:bg-white/10"
                        >
                            Next
                        </button>
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
                                <>
                                    {" "}
                                    <button
                                        disabled={page === 1}
                                        onClick={() => onPageChange(page - 1)}
                                        href="#"
                                        className={`relative inline-flex items-center rounded-l-md px-2 py-2  inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${
                                            page === 1
                                                ? "text-gray-400"
                                                : "text-black"
                                        }`}
                                    >
                                        <span className="sr-only">
                                            Previous
                                        </span>
                                        <MoveLeft
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </button>
                                    {[...Array(pages)].map((_, x) => (
                                        <button
                                            key={x}
                                            disabled={page === x + 1}
                                            onClick={() => onPageChange(x + 1)}
                                            href="#"
                                            aria-current="page"
                                            className={`relative z-10 inline-flex items-center   px-4 py-2 text-sm font-semibold text-black focus:z-20 focus-visible:outline-2 focus-visible:outline-offset-2 inset-ring focus-visible:outline-indigo-500 ${
                                                page - 1 === x
                                                    ? "bg-indigo-500 hover:bg-indigo-500"
                                                    : "hover:bg-white/5"
                                            }`}
                                        >
                                            {x + 1}
                                        </button>
                                    ))}
                                    <button
                                        disabled={page === pages}
                                        onClick={() => onPageChange(page + 1)}
                                        href="#"
                                        className={`relative inline-flex items-center rounded-r-md px-2 py-2  inset-ring inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${
                                            page === pages
                                                ? "text-gray-400"
                                                : "text-black"
                                        }`}
                                    >
                                        <span className="sr-only">Next</span>
                                        <MoveRight
                                            aria-hidden="true"
                                            className="size-5"
                                        />
                                    </button>{" "}
                                </>
                            </nav>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};
export default AdminPagination;
