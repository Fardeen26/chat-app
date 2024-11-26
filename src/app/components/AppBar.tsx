"use client"

import { MoonIcon, SunIcon } from "lucide-react";
import { useDarkMode } from "../hooks/useDarkMode";


export default function AppBar() {
    const { isDarkMode, toggleDarkMode } = useDarkMode();
    return (
        <div onClick={toggleDarkMode} className="w-full flex justify-end pr-8 pt-6">
            <div className='flex items-center dark:text-black'>
                <button>
                    {isDarkMode ? <MoonIcon className='w-[18px] h-[18px] max-sm:w-[14px] max-sm:h-[14px]' /> : <SunIcon className='w-5 h-5 max-sm:w-[15px] max-sm:h-[15px]' />}
                </button>
            </div>
        </div>
    )
}