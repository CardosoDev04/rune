import React, { useContext } from 'react';
import { DarkModeContext} from "../App";

export function DarkModeToggle() {
    const { isDark, toggleDarkMode } = useContext(DarkModeContext);

    return (
        <button onClick={toggleDarkMode} className={"flex w-9 h-9 justify-center text-center items-center rounded-3xl dark-gray-shadow dark:blue-shadow dark:bg-darkComponentBg-600"}>
            {isDark ? '☀️' : '🌙'}
        </button>
    );
}