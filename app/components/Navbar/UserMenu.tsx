'use client';
import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useState } from "react";
import MenuItem from "./MenuItem";

const UserMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = useCallback(() => {
        setIsOpen((prev) => !prev);
    }, []);

    return (
        <div className="relative">
            <div className="flex items-center flex-row gap-3">
                <div onClick={() => {}}
                className="md:block hidden text-sm font-semibold py-3 px-4 rounded-full cursor-pointer transition hover:bg-neutral-100">
                    Your ResiSeeker home
                </div>
                <div onClick={toggleMenu} className="flex items-center flex-row gap-3 rounded-full cursor-pointer hover:shadow-md transition md:py-1 md:px-2 p-4 border-[1px] border-neutral-200">
                    <AiOutlineMenu />
                    <div className="md:block hidden">
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen && (
                <div className="rounded-xl absolute right-0 text-sm top-12 shadow-md w-[40vw ] md:w-3/4 bg-white overflow-hidden">
                    <div className="flex flex-col cursor-pointer">
                        <MenuItem onClick={() => {}} label="Log in"/>
                        <MenuItem onClick={() => {}} label="Sign up"/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserMenu;