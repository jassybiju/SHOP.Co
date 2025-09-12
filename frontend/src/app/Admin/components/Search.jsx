import {Search as SearchIcon} from "lucide-react";

const Search = ({ label, onChange }) => {
    return (
        <div class="w-full mx-auto">
            
            <div class="relative">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon/>
                </div>
                <input
                    onChange={onChange}
                    type="search"
                    id="default-search"
                    class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-500 focus-visible:ring-blue-100 outline-violet-600 "
                    placeholder={label || "search"}
                    required
                />
                
            </div>
        </div>
    );
};
export default Search;
