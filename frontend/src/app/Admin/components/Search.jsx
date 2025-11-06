import {Search as SearchIcon} from "lucide-react";
import React from 'react'
import { useSearchParams } from "react-router";



const Search = ({ label, onChange , width =100 ,className=''}) => {

    return (
        <div className={"w-full mx-auto" + className} style={{width : width+"%"}}>

            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <SearchIcon/>
                </div>
                <input
                    onChange={onChange}
                    type="search"
                    id="default-search"
                    className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-100 focus:border-blue-500 focus-visible:ring-blue-100 outline-violet-600 "
                    placeholder={label || "search"}
                    required
                />

            </div>
        </div>
    );
};
export default Search;
