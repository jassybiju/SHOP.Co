import { ChevronLeft, ChevronRight, MoveLeft, MoveRight } from "lucide-react";

const Pagination = ({ page, pages, onPageChange }) => {
    return (
        <div>
            {/* <div className="border-t border-black/10 pt-8">
                            <div className="flex items-center justify-between">
                                <button
                                    variant="outline"
                                    className="flex items-center gap-2 h-10 px-4"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                    Previous
                                </button>

                                <div className="flex items-center gap-1">
                                    {[1, 2, 3, "...", 8, 9, 10].map(
                                        (page, index) => (
                                            <button
                                                key={index}
                                                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                                                    page === currentPage
                                                        ? "bg-black/6 text-black"
                                                        : "text-black/50 hover:bg-black/6"
                                                }`}
                                                onClick={() =>
                                                    typeof page === "number" &&
                                                    setCurrentPage(page)
                                                }
                                            >
                                                {page}
                                            </button>
                                        )
                                    )}
                                </div>

                                <button
                                    variant="outline"
                                    className="flex items-center gap-2 h-10 px-4"
                                >
                                    Next
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div> */}

            <nav
                aria-label="Pagination"
                className="isolate inline-flex -space-x-px rounded-md"
            >
                <button
                    disabled={page === 1}
                    onClick={() => onPageChange(page - 1)}
                    href="#"
                    className={`flex items-center gap-2 h-10 px-4
                        
                        inset-ring-gray-700 hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${
                            page === 1 ? "text-gray-400" : "text-black"
                        }`}
                >
                    <ChevronLeft className="w-5 h-5" />
                    Previous
                </button>
                <div className="flex items-center gap-1">
                    {[...Array(pages)].map((_, x) => (
                        <button
                            disabled={page === x + 1}
                            onClick={() => onPageChange(x + 1)}
                            href="#"
                            aria-current="page"
                            className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium ${
                                page === x+1
                                    ? "bg-black/6 text-black"
                                    : "text-black/50 hover:bg-black/6"
                            }`}
                        >
                            {x + 1}
                        </button>
                    ))}
                </div>

                <button
                    disabled={page === pages}
                    onClick={() => onPageChange(page + 1)}
                    href="#"
                    className={`flex items-center gap-2 h-10 px-4
                         py-2   hover:bg-white/5 focus:z-20 focus:outline-offset-0 ${
                        page === pages ? "text-gray-400" : "text-black"
                    }`}
                >
                     Next
                                    <ChevronRight className="w-5 h-5" />
                </button>
            </nav>
        </div>
    );
};
export default Pagination;
