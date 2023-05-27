'use client';
import { BiSearch } from "react-icons/bi";

const Search = () => {
    return (
        <div className="w-full md:w-auto border-[1px] rounded-full shadow-sm py-2 hover:shadow-md transition cursor-pointer">
            <div className="flex items-center justify-center flex-row">
                <div className="px-6 text-sm font-semibold">
                    Anywhere
                </div>
                <div className="sm:block text-sm font-semibold hidden px-6 flex-1 text-center border-x-[1px]">
                    Any Week
                </div>
                <div className="flex items-center flex-row gap-3 pl-6 pr-2 text-sm text-gray-600">
                    <div className="sm:block hidden">Add Guests</div>
                    <div className="p-2 rounded-full bg-orange text-white">
                        <BiSearch size={18} />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Search;